import db from '../config/db.js';



export const assignLeads = async () => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Fetch unassigned leads
        const [leads] = await connection.query(
            `SELECT * FROM leads WHERE status = 'UNASSIGNED' ORDER BY created_at`
        );

        if(!leads.length) {
             console.log('No unassigned leads found');
             return;
        }

        // Fetch sales executives
        const [executives] = await connection.query(
            `SELECT * FROM sales_executives ORDER BY priority_order`
        );


        let executiveIndex = 0;

        for(const lead of leads){
            let assigned = false;
            let attempts = 0;

            while(!assigned && attempts < executives.length){
                const executive = executives[executiveIndex];

                if(executive.current_leads < executive.max_leads){
                    await connection.query(
                        `UPDATE leads SET status = 'ASSIGNED', assigned_to = ?, assigned_at = NOW() WHERE id = ?`, [executive.id, lead.id]
                        );

                    await connection.query(
                           `UPDATE sales_executives SET current_leads = current_leads + 1 WHERE id = ?`, [executive.id]
                    );

                    executive.current_leads++;
                    assigned = true; 
                }

                executiveIndex = (executiveIndex + 1) % executives.length;
                attempts++;
            }

            if(!assigned) break; 
        }
        
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
        // console.error('Error assigning leads:', error);
    } finally {
        connection.release();
    }
}