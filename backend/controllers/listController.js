const List = require('../models/List');
const Agent = require('../models/Agent');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const Contact = require('../models/Contact');

const listController = {
  // Upload and distribute list
  uploadList: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const agents = await Agent.find();
      if (agents.length === 0) {
        return res.status(400).json({ message: 'No agents available' });
      }

      let items = [];
      
      // Parse file based on extension
      if (req.file.mimetype === 'text/csv') {
        items = await parseCSV(req.file.path);
      } else {
        items = await parseExcel(req.file.path);
      }

      // Enhanced debugging
      console.log('Raw items:', items);
      console.log('Sample item fields:', Object.keys(items[0]));
      console.log('First item:', items[0]);

      // Distribute items among agents
      const distributedLists = distributeItems(items, agents);

      // Save distributed lists
      for (const [agentId, items] of Object.entries(distributedLists)) {
        const list = new List({
          agentId,
          items: items.map(item => {
            console.log('Processing item:', item); // Debug individual items

            // Get all keys from the item
            const keys = Object.keys(item);
            
            // Find the matching key for each field
            const firstNameKey = keys.find(k => 
              k.toLowerCase().includes('first') || 
              k.toLowerCase().includes('name')
            );
            const phoneKey = keys.find(k => 
              k.toLowerCase().includes('phone') || 
              k.toLowerCase().includes('mobile')
            );
            const notesKey = keys.find(k => 
              k.toLowerCase().includes('note') || 
              k.toLowerCase().includes('comment')
            );

            // Map the values using found keys
            return {
              firstName: item[firstNameKey] || '',
              phone: item[phoneKey] || '',
              notes: item[notesKey] || ''
            };
          })
        });
        
        console.log('Saving list:', list); // Debug list before saving
        await list.save();
      }

      // Clean up uploaded file
      fs.unlinkSync(req.file.path);

      res.json({ 
        message: 'List uploaded and distributed successfully',
        distribution: Object.entries(distributedLists).map(([agentId, items]) => ({
          agentId,
          itemCount: items.length,
          items: items // Include items in response for verification
        }))
      });
    } catch (error) {
      console.error('Distribution error:', error);
      if (req.file) fs.unlinkSync(req.file.path);
      res.status(500).json({ message: error.message });
    }
  },

  // Get lists for an agent
  getAgentLists: async (req, res) => {
    try {
      const agentId = req.params.agentId;
      const lists = await List.find({ agentId }).sort({ createdAt: -1 });
      
      const formattedLists = lists.flatMap(list => list.items);

      res.json(formattedLists);
    } catch (error) {
      console.error('Error fetching agent lists:', error);
      res.status(500).json({ message: 'Error fetching lists', error: error.message });
    }
  }
};

// Helper functions
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};

const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
};

// Update the distributeItems function to accept agents parameter
const distributeItems = (items, agents) => {
  if (agents.length === 0) {
    throw new Error('No agents available for distribution');
  }

  const distribution = {};
  
  // Initialize distribution object with actual agent IDs
  agents.forEach(agent => {
    distribution[agent._id] = [];
  });

  // Calculate base items per agent
  const itemsPerAgent = Math.floor(items.length / agents.length);
  const remainingItems = items.length % agents.length;

  let currentIndex = 0;

  // Distribute base items using actual agent IDs
  agents.forEach(agent => {
    for (let i = 0; i < itemsPerAgent; i++) {
      distribution[agent._id].push(items[currentIndex]);
      currentIndex++;
    }
  });

  // Distribute remaining items sequentially using actual agent IDs
  for (let i = 0; i < remainingItems; i++) {
    distribution[agents[i]._id].push(items[currentIndex]);
    currentIndex++;
  }

  return distribution;
};

module.exports = listController;