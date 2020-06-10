const url = 'http://ec2-34-240-16-82.eu-west-1.compute.amazonaws.com:8081';
const requestGetOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};
const requestPostOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};
export { url, requestGetOptions, requestPostOptions };
