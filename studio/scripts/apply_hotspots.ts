import {getCliClient} from 'sanity/cli'
import fs from 'fs'
import path from 'path'

async function run() {
  const client = getCliClient()
  
  const mutationsPath = path.resolve(__dirname, '../data/hotspot_mutations.json')
  const data = JSON.parse(fs.readFileSync(mutationsPath, 'utf8'))
  
  console.log(`Applying ${data.mutations.length} mutations...`)
  
  try {
    const dataset = client.config().dataset || 'production';
    const res = await client.request({
      uri: `/data/mutate/${dataset}`,
      method: 'POST',
      body: data
    })
    console.log('Success!', res)
  } catch (error) {
    console.error('Error applying mutations:', error.message)
  }
}

run()
