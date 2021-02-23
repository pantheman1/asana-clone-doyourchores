'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Squads', [
      {
        name: 'Super Cleaners',
        zone_id: 1,
        description: "We are the Super Cleaners. Fearless, strong, loyal. We will clean even your most disgusting toilets, your dustiest fan blades, and leave our mom with a smile on her face."
      },
      {
        name: 'Sad-Sack Cleaners',
        zone_id: 2,
        description: "We are not happy about cleaning. Don't talk to us, don't look at us, and for goodness' sake, stop telling us what to do!"
      },
      {
        name: "The Boys",
        zone_id: 3,
        description: "The boys always get picked on to clean everything. The girls never do any work."
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Squads', null, {});
  }
};