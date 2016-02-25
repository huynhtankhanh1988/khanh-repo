var model = require('nodejs-model');
var Company = model("Company").attr('name', {
  validations: {
    presence: {
      message: 'Name is required!'
    }
  }
}).attr('address', {
  validations: {
    length: {
      minimum: 5,
      maximum: 200,
      messages: {
        tooShort: 'address is too short!',
        tooLong: 'address is too long!'
      }
    }
  },
  //this tags the accessibility as _private_
  tags: ['private']
});
