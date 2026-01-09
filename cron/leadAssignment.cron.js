import cron from 'node-cron';
import { assignLeads } from '../services/lead.service.js';


cron.schedule('* * * * *', async () => {
    try {
        console.log('Running Lead Assignment Cron Job');
        await assignLeads();
        console.log('Lead Assignment Completed');
    } catch (error) {
        console.error('Error in Lead Assignment Cron Job:', error);
    }
});

