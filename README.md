A website that maintains histories of the graves in the Toftrees churchyard in Norfolk.

The backend is a Sanity Studio in the `./studio` directory, with the data in `./studio/data/graves.ndjson` and the schema in the `./studio/schemaTypes` directory.

The frontend is a Next.js website in the `./web` directory. in a restrained style with a front page with an image of the church from the sanity SiteSettings document and a history of the church.

There will be a graves tab that lists all the documents of _type grave as a graves summary page, with a click through to the grave details page for each individual grave. 

There will also be a hotspotted image of the churchyard so a usrer acan click onto the image and be taked to the graves website.