(function () {
    allPeople = [];

    fetch("https://swapi.dev/api/people/")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var count = data.count;
            var peopleToAddFunc = doOnAllPeopleFull(count);
            peopleToAddFunc(data.results);

            var numberOfFetched = Math.ceil(data.count / data.results.length);

            for (var i = 2; i <= numberOfFetched; i++) {
                fetch("https://swapi.dev/api/people/?page=" + i)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        peopleToAddFunc(data.results);
                    });
            }
        });

    function doOnAllPeopleFull(count, peopleToAdd) {
        return function (peopleToAdd) {
            allPeople = allPeople.concat(peopleToAdd);
            if (allPeople.length >= count) {
                addLisToPeopleUl();
            } else {
                console.log("not done");
            }
        }
    }

    function addLisToPeopleUl() {
        var ul = document.querySelector('ul')

        allPeople.forEach(function(person){
            var li = document.createElement("li");
            var img = document.createElement("img");
            var src = "" + person.url.split("/").pop();
            img.src = "https://starwars-visualguide.com/assets/img/characters/" + person.url.split("/")[5] + ".jpg"
            img.src = src;
            li.innerHTML = person.name;
            li.appendChild(img);
            ul.appendChild(li);
        });
    }
})();