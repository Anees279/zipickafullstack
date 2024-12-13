const { JSDOM } = require('jsdom');
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

describe('Footer Fetch Error Handling', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
});
