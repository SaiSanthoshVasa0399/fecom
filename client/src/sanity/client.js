import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'h2gy79hk',
  dataset: 'production',
  apiVersion: '2022-03-07',
  useCdn: true,
  token: 'sk0T7VR3PyitJ52uUWjTKLmkiT9MdvZDYIphytNpZYt1bFzJORNwVhyvpGyMJss7ISDRoAXYeJeWx68yu0Fc2g0A2JVretpw9FRLFSKWwfYWBDOU3Vj96YzMLGYn1BheG7HQRxTIhv6HUe0t7Ne9tIrMcCZ8HhRN1Y5avYxznUosUjsNAUe5'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);