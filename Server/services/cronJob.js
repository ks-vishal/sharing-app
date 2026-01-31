const cron = require("node-cron");
const File = require('../models/file');

function ExpiryCron() {
  // Runs every minute (for testing; change to daily later)
  cron.schedule('* * * * *', async () => {
    console.log('⏰ Running expiry check...');

    const now = new Date();
    try {
      const result = await File.updateMany(
        { expiry: { $lt: now }, isExpired: false },
        { isExpired: true }
      );
      console.log(`Expired ${result.modifiedCount || result.nModified} file(s).`);
    } catch (err) {
      console.error("Error in cron job:", err);
    }
  });
}

module.exports = ExpiryCron;
