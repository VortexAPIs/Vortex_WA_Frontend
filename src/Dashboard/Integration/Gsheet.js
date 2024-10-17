import React from 'react'

function Gsheet() {
  return (
    <>
        <div>
            <h4>Download Sample Google Sheet and make a copy for your use</h4>
            <a href="https://docs.google.com/spreadsheets/d/1pb7JFBdyXLFuaDNx-SrRHpm6MzgHDB_HYzTFU26wUFM/edit?usp=sharing" target='_blank' rel='noreferrer' style={{textDecoration:'none'}} download>Download Now</a>
        </div>
        <hr />
        <div>
            <h2 style={{color:'#E06409'}}>Instructions</h2>
            <div className="row" style={{padding: '20px'}}>
                <div className='col' style={{padding: '10px', borderRight:'solid 2px', borderRightColor: '#000'}}>
                    <ol className="list-group list-group-flush" style={{marginLeft: '15px'}}>
                        <li>Click on the Download Now link to get the Sample Google Sheet.</li>
                        <li>Make a copy of the Sample Google Sheet.</li>
                        <li>Do not change Tab Name of the copied Google Sheet.</li>
                        <li>You can add new Tabs if required.</li>
                        <li>Share your copied Google Sheet to <a href='mailto:whatsapp-bot-service@whatsapp-integration-437116.iam.gserviceaccount.com' rel='noreferer'>whatsapp-bot-service@whatsapp-integration-437116.iam.gserviceaccount.com</a> with Editor rights.</li>
                        <li>Sharing this sheet is required to enable WhatsApp BOT.</li>
                    </ol>
                    
                </div>
            </div>
        </div>
                
    </>
  )
}

export default Gsheet
