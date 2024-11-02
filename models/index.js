const Disaster = require('./Disaster');
const Request = require('./Request');


Disaster.hasMany(Request, { foreignKey: 'Disaster_ID' });
Request.belongsTo(Disaster, { foreignKey: 'Disaster_ID' });
