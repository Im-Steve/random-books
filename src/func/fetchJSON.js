export default async function fetchJSON(jsonUrl) {
  let data = null;
  let error = null;

  try {
    const response = await fetch(jsonUrl);

    if (!response.ok) {
      throw new Error(`An error occurred while fetching JSON data from: ${jsonUrl}`);
    }

    data = await response.json();
  } catch (err) {
    error = err;
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return { data, error };
}
