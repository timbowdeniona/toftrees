const fs = require('fs');
const path = require('path');

// Read the .env file
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env file not found at', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    // Remove surrounding quotes if present
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
});

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.NEXT_PUBLIC_SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Error: Missing environment variables in .env');
  console.error('Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_TOKEN');
  process.exit(1);
}

console.log(`Seeding microtext into Project: ${projectId}, Dataset: ${dataset}...`);

const doc = {
  _id: 'microtext-grave-details-explanation',
  _type: 'microtext',
  key: {
    _type: 'slug',
    current: 'grave-details-explanation'
  },
  title: 'Understanding Our Records',
  imageAltText: 'Illustration of historic parish burial register entry',
  text: [
    {
      _type: 'block',
      _key: 'p1',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: 'GRO refers to the General Records Office records of deaths. So Q is the quarter of the year when the death occurred, followed by the year of birth. Then comes the local government area where the death was registered, followed by the volume number, and sometimes the letter of an additional volume, of their records, and finally the page where it is recorded.'
        }
      ],
      markDefs: [],
      style: 'normal'
    },
    {
      _type: 'block',
      _key: 'p2',
      children: [
        {
          _type: 'span',
          _key: 's2',
          text: 'REF refers to the parish Burial Register. First there is the year of the death, then the page number, and finally the entry number.'
        }
      ],
      markDefs: [],
      style: 'normal'
    },
    {
      _type: 'block',
      _key: 'p3',
      children: [
        {
          _type: 'span',
          _key: 's3',
          text: 'Deaths after 1999 may not yet have a GRO or Parish Register entry recorded on the website.'
        }
      ],
      markDefs: [],
      style: 'normal'
    },
    {
      _type: 'block',
      _key: 'p4',
      children: [
        {
          _type: 'span',
          _key: 's4',
          text: 'A portion of the interactive churchyard map is shown for context, although you can also view the whole churchyard by clicking on the Map button at the top of the page. This is especially useful if you find that there are more than one person buried in our churchyard with the name you are searching for.'
        }
      ],
      markDefs: [],
      style: 'normal'
    },
    {
      _type: 'block',
      _key: 'p5',
      children: [
        {
          _type: 'span',
          _key: 's5',
          text: 'We are always mindful that there are many people buried in our churchyard that do not have a memorial, and so are not included in this list. We remember all of them in our prayers.'
        }
      ],
      markDefs: [],
      style: 'normal'
    }
  ]
};

const mutationBody = {
  mutations: [
    {
      createOrReplace: doc
    }
  ]
};

const mutateUrl = `https://${projectId}.api.sanity.io/v2023-05-03/data/mutate/${dataset}`;

fetch(mutateUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(mutationBody)
})
  .then((response) => {
    if (!response.ok) {
      return response.text().then((err) => {
        throw new Error(`Sanity API Error: ${response.status} - ${err}`);
      });
    }
    return response.json();
  })
  .then((data) => {
    console.log('Successfully seeded the microtext entry!');
    console.log(data);
  })
  .catch((err) => {
    console.error('Mutation failed:', err.message);
    process.exit(1);
  });
