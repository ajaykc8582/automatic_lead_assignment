import dotenv from 'dotenv';


dotenv.config();

import './cron/leadAssignment.cron.js';


console.log('Lead Assignment Cron Job Started');