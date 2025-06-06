const fs = require('fs');
const path = require('path');

// Templates for different types of notification emails
const emailTemplates = {
    clientCreation: (data) => {
        return {
            subject: `New Client Created: ${data.clientName}`,
            text: `A new client "${data.clientName}" has been created in the Job Portal system. Client UUID: ${data.clientId}`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background-color: #4f46e5; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">New Client Created</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">A new client has been successfully created in the Job Portal system.</p>
                        <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Client Details:</h3>
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Name:</strong> ${data.clientName}</p>
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Client ID (UUID):</strong> ${data.clientId}</p>
                            ${data.address ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Address:</strong> ${data.address}</p>` : ''}
                            ${data.email ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Email:</strong> ${data.email}</p>` : ''}
                            ${data.phone ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Phone:</strong> ${data.phone}</p>` : ''}
                        </div>
                        <p style="font-size: 15px; color: #475569;">You can view the full client details in the <a href="${process.env.DASHBOARD_URL || data.portalUrl || '#'}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">Job Portal</a>.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };
    },
    
    clientUpdate: (data) => {
        return {
            subject: `Client Updated: ${data.clientName}`,
            text: `Client "${data.clientName}" has been updated in the Job Portal system.`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background-color: #0ea5e9; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">Client Updated</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">A client's information has been updated in the Job Portal system.</p>
                        <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Updated Client Details:</h3>
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Name:</strong> ${data.clientName}</p>
                            ${data.changes ? `<p style="margin: 10px 0 5px; font-size: 15px;"><strong>Changes Made:</strong></p>
                            <ul style="margin: 0; padding-left: 20px;">
                                ${data.changes.map(change => `<li style="margin: 3px 0;">${change}</li>`).join('')}
                            </ul>` : ''}
                        </div>
                        <p style="font-size: 15px; color: #475569;">You can view the full client details in the <a href="${data.portalUrl || '#'}" style="color: #0ea5e9; text-decoration: none; font-weight: 500;">Job Portal</a>.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };
    },
    
    jobCreation: (data) => {
        return {
            subject: `New Job Created: ${data.jobId || 'New Job'}`,
            text: `A new job "${data.jobDescription}" has been created in the Job Portal system.`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background-color: #10b981; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">New Job Created</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">A new job has been created in the Job Portal system.</p>                        <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Job Details:</h3>
                            ${data.jobId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Job ID:</strong> ${data.jobId}</p>` : ''}
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Description:</strong> ${data.jobDescription}</p>
                            ${data.client ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Client:</strong> ${data.client}</p>` : ''}
                            ${data.status ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Status:</strong> <span style="display: inline-block; background-color: ${
                                data.status === 'Quote' ? '#dbeafe' : 
                                data.status === 'Work Order' ? '#fef9c3' : 
                                data.status === 'Completed' ? '#dcfce7' : '#f3f4f6'
                            }; padding: 2px 8px; border-radius: 4px; font-size: 14px;">${data.status}</span></p>` : ''}
                            ${data.date ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Date:</strong> ${data.date}</p>` : ''}
                            ${data.jobAddress ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Service Address:</strong> ${data.jobAddress}</p>` : ''}
                            ${data.workDoneDescription ? `
                                <p style="margin: 10px 0 5px; font-size: 15px;"><strong>Work Description:</strong></p>
                                <p style="margin: 5px 0; font-size: 14px; padding: 8px; background-color: #f1f5f9; border-radius: 4px;">${data.workDoneDescription}</p>
                            ` : ''}
                            
                            ${data.quoteDate ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Quote Date:</strong> ${data.quoteDate}</p>` : ''}
                            ${data.quoteSent ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Quote Sent:</strong> ${data.quoteSent === '1' ? 'Yes' : 'No'}</p>` : ''}
                            
                            ${data.workOrderDate ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Work Order Date:</strong> ${data.workOrderDate}</p>` : ''}
                            ${data.completionDate ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Completion Date:</strong> ${data.completionDate}</p>` : ''}
                            
                            ${data.invoiceAmount ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Invoice Amount:</strong> $${data.invoiceAmount}</p>` : ''}
                            ${data.invoiceSent ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Invoice Sent:</strong> ${data.invoiceSent === '1' ? 'Yes' : 'No'}</p>` : ''}
                            
                            ${(data.paymentDate || data.paymentMethod || data.paymentAmount) ? `
                                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0;">
                                    <h4 style="margin-top: 0; color: #1e293b; font-size: 16px;">Payment Information:</h4>
                                    ${data.paymentAmount ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Payment Amount:</strong> $${data.paymentAmount}</p>` : ''}
                                    ${data.paymentMethod ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Payment Method:</strong> ${data.paymentMethod}</p>` : ''}
                                    ${data.paymentDate ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Payment Date:</strong> ${data.paymentDate}</p>` : ''}
                                </div>
                            ` : ''}
                        </div>
                        <p style="font-size: 15px; color: #475569;">You can view the full job details in the <a href="${data.portalUrl || '#'}" style="color: #10b981; text-decoration: none; font-weight: 500;">Job Portal</a>.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };
    },
    
    jobUpdate: (data) => {
        return {
            subject: `Job Updated: ${data.jobId || 'Job Update'}`,
            text: `The job "${data.jobDescription}" has been updated in the Job Portal system.`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background-color: #f59e0b; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">Job Updated</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">A job has been updated in the Job Portal system.</p>
                        <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Job Details:</h3>
                            ${data.jobId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Job ID:</strong> ${data.jobId}</p>` : ''}
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Description:</strong> ${data.jobDescription}</p>
                            ${data.client ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Client:</strong> ${data.client}</p>` : ''}
                            
                            ${data.oldStatus && data.newStatus ? `
                            <p style="margin: 10px 0 5px; font-size: 15px;"><strong>Status Change:</strong></p>
                            <div style="display: flex; align-items: center; margin: 5px 0;">                                <span style="display: inline-block; background-color: ${
                                    data.oldStatus === 'Quote' ? '#ffedd5' : 
                                    data.oldStatus === 'Work Order' ? '#dbeafe' : 
                                    data.oldStatus === 'Completed' ? '#dcfce7' : '#f3f4f6'
                                }; padding: 2px 8px; border-radius: 4px; font-size: 14px;">${data.oldStatus}</span>
                                <span style="margin: 0 10px;">→</span>
                                <span style="display: inline-block; background-color: ${
                                    data.newStatus === 'Quote' ? '#ffedd5' : 
                                    data.newStatus === 'Work Order' ? '#dbeafe' : 
                                    data.newStatus === 'Completed' ? '#dcfce7' : '#f3f4f6'
                                }; padding: 2px 8px; border-radius: 4px; font-size: 14px;">${data.newStatus}</span>
                            </div>                            ` : data.status ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Status:</strong> <span style="display: inline-block; background-color: ${
                                data.status === 'Quote' ? '#ffedd5' : 
                                data.status === 'Work Order' ? '#dbeafe' : 
                                data.status === 'Completed' ? '#dcfce7' : '#f3f4f6'
                            }; padding: 2px 8px; border-radius: 4px; font-size: 14px;">${data.status}</span></p>` : ''}
                            
                            ${data.changes ? `<p style="margin: 10px 0 5px; font-size: 15px;"><strong>Changes Made:</strong></p>
                            <ul style="margin: 0; padding-left: 20px;">
                                ${data.changes.map(change => `<li style="margin: 3px 0;">${change}</li>`).join('')}
                            </ul>` : ''}
                        </div>
                        <p style="font-size: 15px; color: #475569;">You can view the full job details in the <a href="${data.portalUrl || '#'}" style="color: #f59e0b; text-decoration: none; font-weight: 500;">Job Portal</a>.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `        };
    },
    
    jobStatusUpdate: (data) => {
        return {
            subject: `Job Status Updated: ${data.jobId || data.uuid || 'Job Status Change'}`,
            text: `The job status has been updated to "${data.status}" in the Job Portal system.`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">                    <div style="background-color: ${
                        data.status === 'Quote' ? '#f97316' : 
                        data.status === 'Work Order' ? '#3b82f6' : 
                        data.status === 'Completed' ? '#10b981' : 
                        data.status === 'Unsuccessful' ? '#ef4444' : '#6366f1'
                    }; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">Job Status Updated</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">A job's status has been updated in the Job Portal system.</p>
                        <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Job Details:</h3>
                            ${data.jobId || data.uuid ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Job ID:</strong> ${data.jobId || data.uuid}</p>` : ''}
                            ${data.description || data.jobDescription ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Description:</strong> ${data.description || data.jobDescription}</p>` : ''}
                            ${data.client ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Client:</strong> ${data.client}</p>` : ''}
                              <div style="margin: 15px 0; padding: 10px; background-color: ${
                                data.status === 'Quote' ? '#fff7ed' : 
                                data.status === 'Work Order' ? '#eff6ff' : 
                                data.status === 'Completed' ? '#f0fdf4' : 
                                data.status === 'Unsuccessful' ? '#fef2f2' : '#f8fafc'
                            }; border-radius: 6px; border-left: 4px solid ${
                                data.status === 'Quote' ? '#f97316' : 
                                data.status === 'Work Order' ? '#3b82f6' : 
                                data.status === 'Completed' ? '#10b981' : 
                                data.status === 'Unsuccessful' ? '#ef4444' : '#6366f1'
                            };">
                                <p style="margin: 0; font-size: 16px; font-weight: 600; color: ${
                                    data.status === 'Quote' ? '#c2410c' : 
                                    data.status === 'Work Order' ? '#1e40af' : 
                                    data.status === 'Completed' ? '#166534' : 
                                    data.status === 'Unsuccessful' ? '#dc2626' : '#4338ca'
                                };">New Status: ${data.status}</p>
                                ${data.statusDescription ? `<p style="margin: 5px 0 0; font-size: 14px; color: #64748b;">${data.statusDescription}</p>` : ''}
                            </div>
                            
                            ${data.date ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Updated:</strong> ${data.date}</p>` : ''}
                        </div>                        <p style="font-size: 15px; color: #475569;">You can view the full job details in the <a href="${data.portalUrl || '#'}" style="color: ${
                            data.status === 'Quote' ? '#f97316' : 
                            data.status === 'Work Order' ? '#3b82f6' : 
                            data.status === 'Completed' ? '#10b981' : 
                            data.status === 'Unsuccessful' ? '#ef4444' : '#6366f1'
                        }; text-decoration: none; font-weight: 500;">Job Portal</a>.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };
    },
    
    quoteCreation: (data) => {
        return {
            subject: `New Quote Created: ${data.quoteId || data.jobId || 'New Quote'}`,
            text: `A new quote has been created for job "${data.jobDescription}" in the Job Portal system.`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background-color: #6366f1; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">New Quote Created</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">A new quote has been created in the Job Portal system.</p>
                        <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Quote Details:</h3>
                            ${data.quoteId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Quote ID:</strong> ${data.quoteId}</p>` : ''}
                            ${data.jobId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Job ID:</strong> ${data.jobId}</p>` : ''}
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Description:</strong> ${data.jobDescription}</p>
                            ${data.client ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Client:</strong> ${data.client}</p>` : ''}
                            ${data.amount ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Amount:</strong> $${data.amount}</p>` : ''}
                            ${data.date ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Date:</strong> ${data.date}</p>` : ''}
                        </div>
                        <p style="font-size: 15px; color: #475569;">You can view and respond to this quote in the <a href="${data.portalUrl || '#'}" style="color: #6366f1; text-decoration: none; font-weight: 500;">Job Portal</a>.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };    },
    
    quoteAccepted: (data) => {
        return {
            subject: `Quote Accepted: ${data.quoteId || data.jobId || 'Quote'}`,
            text: `Quote "${data.quoteId}" has been accepted by the client in the Job Portal system.`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background-color: #10b981; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">Quote Accepted</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">Great news! A quote has been accepted in the Job Portal system.</p>
                        <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Quote Details:</h3>
                            ${data.quoteId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Quote ID:</strong> ${data.quoteId}</p>` : ''}
                            ${data.jobId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Job ID:</strong> ${data.jobId}</p>` : ''}
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Description:</strong> ${data.jobDescription || data.description}</p>
                            ${data.client || data.clientName ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Client:</strong> ${data.client || data.clientName}</p>` : ''}
                            ${data.amount || data.price ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Amount:</strong> $${data.amount || data.price}</p>` : ''}
                            ${data.date ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Date:</strong> ${data.date}</p>` : ''}
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Status:</strong> <span style="display: inline-block; background-color: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 14px; font-weight: 500;">Accepted</span></p>
                        </div>
                        <div style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <p style="margin: 0; font-size: 15px; color: #065f46; font-weight: 500;">✅ You can now proceed with the work as outlined in the quote.</p>
                        </div>
                        <p style="font-size: 15px; color: #475569;">You can view the full quote details in the <a href="${data.portalUrl || '#'}" style="color: #10b981; text-decoration: none; font-weight: 500;">Job Portal</a>.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };
    },
    
    quoteRejected: (data) => {
        return {
            subject: `Quote Rejected: ${data.quoteId || data.jobId || 'Quote'}`,
            text: `Quote "${data.quoteId}" has been rejected by the client in the Job Portal system.`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background-color: #ef4444; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">Quote Rejected</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">A quote has been rejected in the Job Portal system.</p>
                        <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Quote Details:</h3>
                            ${data.quoteId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Quote ID:</strong> ${data.quoteId}</p>` : ''}
                            ${data.jobId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Job ID:</strong> ${data.jobId}</p>` : ''}
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Description:</strong> ${data.jobDescription || data.description}</p>
                            ${data.client || data.clientName ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Client:</strong> ${data.client || data.clientName}</p>` : ''}
                            ${data.amount || data.price ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Amount:</strong> $${data.amount || data.price}</p>` : ''}
                            ${data.date ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Date:</strong> ${data.date}</p>` : ''}
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Status:</strong> <span style="display: inline-block; background-color: #fecaca; color: #b91c1c; padding: 2px 8px; border-radius: 4px; font-size: 14px; font-weight: 500;">Rejected</span></p>
                            ${data.rejectionReason ? `<p style="margin: 10px 0 5px; font-size: 15px;"><strong>Rejection Reason:</strong></p>
                            <p style="margin: 5px 0; font-size: 14px; padding: 8px; background-color: #fef2f2; border-radius: 4px; color: #991b1b;">${data.rejectionReason}</p>` : ''}
                        </div>
                        <p style="font-size: 15px; color: #475569;">You can view the full quote details and create a revised quote in the <a href="${data.portalUrl || '#'}" style="color: #ef4444; text-decoration: none; font-weight: 500;">Job Portal</a>.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };
    },
    
    invoiceGenerated: (data) => {
        return {
            subject: `Invoice Generated: ${data.invoiceId || data.jobId || 'New Invoice'}`,
            text: `An invoice has been generated for job "${data.jobDescription}" in the Job Portal system.`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background-color: #ec4899; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">Invoice Generated</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">An invoice has been generated in the Job Portal system.</p>
                        <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Invoice Details:</h3>
                            ${data.invoiceId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Invoice ID:</strong> ${data.invoiceId}</p>` : ''}
                            ${data.jobId ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Job ID:</strong> ${data.jobId}</p>` : ''}
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Description:</strong> ${data.jobDescription}</p>
                            ${data.client ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Client:</strong> ${data.client}</p>` : ''}
                            ${data.amount ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Amount:</strong> $${data.amount}</p>` : ''}
                            ${data.dueDate ? `<p style="margin: 5px 0; font-size: 15px;"><strong>Due Date:</strong> ${data.dueDate}</p>` : ''}
                        </div>
                        <p style="font-size: 15px; color: #475569;">You can view and pay this invoice in the <a href="${data.portalUrl || '#'}" style="color: #ec4899; text-decoration: none; font-weight: 500;">Job Portal</a>.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };
    },    clientWelcome: (data) => {
        return {
            subject: `Welcome to Job Portal, ${data.clientName}!`,
            text: `Welcome to Job Portal! Your account has been successfully created. Please use the following link to set up your password: ${data.setupUrl}`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background-color: #3b82f6; padding: 15px; border-radius: 6px 6px 0 0;">
                        <h2 style="color: white; margin: 0; font-weight: 500;">Welcome to Job Portal!</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">Thank you for joining Job Portal, ${data.clientName}! Your account has been successfully created.</p>
                          <div style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 6px; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #047857; font-size: 18px;">🔐 Set Up Your Password</h3>
                            <p style="margin: 5px 0; font-size: 15px; color: #065f46;">To complete your account setup, please click the button below to create your secure password.</p>
                            ${data.email ? `<p style="margin: 5px 0; font-size: 14px; color: #065f46;"><strong>Email for login:</strong> ${data.email}</p>` : ''}
                        </div>
                        
                        <div style="margin: 25px 0; text-align: center;">
                            <a href="${data.setupUrl}" style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);">🔒 Set Up Your Password</a>
                        </div>
                        
                        <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 12px; margin: 20px 0;">
                            <p style="margin: 0; font-size: 14px; color: #92400e;"><strong>Important:</strong> This setup link will expire in 24 hours for security reasons. If you need a new link, please contact our support team.</p>
                        </div>
                        
                        <p style="font-size: 15px; color: #475569;">With your client portal, you can:</p>
                        <ul style="color: #475569; font-size: 15px;">
                            <li style="margin-bottom: 8px;">View all your jobs and their current status</li>
                            <li style="margin-bottom: 8px;">Review and approve quotes</li>
                            <li style="margin-bottom: 8px;">Access and pay invoices</li>
                            <li style="margin-bottom: 8px;">Communicate with our team</li>
                            <li style="margin-bottom: 8px;">Request new services</li>
                        </ul>
                        
                        <p style="font-size: 15px; color: #475569; margin-top: 25px;">If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 0 0 6px 6px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };
    }
};

// Get email template for a specific notification type
const getEmailTemplate = (type, data = {}) => {
    if (!emailTemplates[type]) {
        return {
            subject: 'Job Portal Notification',
            text: 'You have a new notification from the Job Portal system.',
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155;">You have a new notification from the Job Portal system.</p>
                        <p style="font-size: 15px; color: #475569;">${data.message || 'Please check your Job Portal dashboard for more details.'}</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; font-size: 14px; color: #64748b;">
                        <p style="margin: 5px 0;">This is an automated message from Job Portal.</p>
                        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Job Portal - All rights reserved.</p>
                    </div>
                </div>
            `
        };
    }
    
    return emailTemplates[type](data);
};

module.exports = {
    getEmailTemplate
};