/* jshint -W079 */
var mockData = (function() {
  return {
    getMockPeople: getMockPeople,
    getMockStates: getMockStates,
    getMockReleases: getMockReleases,
    getMockComics: getMockComics
  };

  function getMockStates() {
    return [
      {
        state: 'releases',
        config: {
          url: '/',
          templateUrl: 'app/releases/releases.html',
          controller: 'ReleasesController',
          controllerAs: 'vm',
          title: 'Releases',
          settings: {
            nav: 1,
            content: '<i class="fa fa-newspaper-o"></i> Releases'
          }
        }
      }
    ];
  }

  function getMockPeople() {
    return [
      { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
      { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
      { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
      { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
      { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
      { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
      { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
    ];
  }

  function getMockReleases() {
    return [
      { id: 2, name:'Senpai, Sore Hitokuchi Kudasai!  ', stub:'senpai_sore_hitokuchi_kudasai',uniqid:'56fc53a78ab5e',hidden:'0',author:'Mizu Asato',artist:'Mizu Asato'},
      {'id':2,'name':'Senpai, Sore Hitokuchi Kudasai!  ','stub':'senpai_sore_hitokuchi_kudasai','uniqid':'56fc53a78ab5e','hidden':'0','author':'Mizu Asato','artist':'Mizu Asato'}
    ];
  }

  function getMockComics() {
    return [
      { id: 2, name:'Senpai, Sore Hitokuchi Kudasai!  ', stub:'senpai_sore_hitokuchi_kudasai',uniqid:'56fc53a78ab5e',hidden:'0',author:'Mizu Asato',artist:'Mizu Asato'},
      {'id':2,'name':'Senpai, Sore Hitokuchi Kudasai!  ','stub':'senpai_sore_hitokuchi_kudasai','uniqid':'56fc53a78ab5e','hidden':'0','author':'Mizu Asato','artist':'Mizu Asato'}
    ];
  }
})();
