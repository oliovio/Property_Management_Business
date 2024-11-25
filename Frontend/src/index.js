// This is the API module

export default {};
const apiUrl = 'https://api.example.com';

export const fetchProperties = async () => {
  try {
    const response = await fetch(`${apiUrl}/properties`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const fetchPropertyById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/properties/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};