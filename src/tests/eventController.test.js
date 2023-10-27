const { getAllEvents } = require('../controllers/eventController'); 

test('should fetch all events', async () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await getAllEvents({}, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalled();
});
