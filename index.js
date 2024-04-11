function setDog(image, breed, weight, height, lifeSpan, temperament, breedGroup) {
    const dogImage = document.getElementById('dog-image')
    const dogBreed = document.getElementById('dog-breed')
    const dogWeight = document.getElementById('dog-weight');
    const dogHeight = document.getElementById('dog-height');
    const dogLifeSpan = document.getElementById('dog-life-span');
    const dogTemperament = document.getElementById('dog-breed-temperament');
    const dogBreedGroup = document.getElementById('dog-breed-group');

    dogImage.src = image;
    dogBreed.innerText = breed;
    dogWeight.innerText = weight;
    dogHeight.innerText = height;
    dogLifeSpan.innerText = lifeSpan;
    dogTemperament.innerText = temperament;
    dogBreedGroup.innerText = breedGroup;
}

function setLoader(isLoading) {
    if (isLoading) {
        document.querySelector('.card-dog-loader').style.display = 'flex';
        document.querySelector('.card-dog-body').style.display = 'none';
        document.querySelector('.card-body-footer').style.display = 'none';
    } else {
        document.querySelector('.card-dog-loader').style.display = 'none';
        document.querySelector('.card-dog-body').style.display = 'flex';
        document.querySelector('.card-body-footer').style.display = 'flex';
    }
}


function getRadomImage() {
    setLoader(true);
    const url = "https://api.thedogapi.com/v1/images/search?limit=10&include_breed=1";
    const options = {
      method: "GET",
      headers: {
        "x-api-key":  "live_M9fqtWsTYg2sYsk5GbmPtyh9wDiFyWnfR3GUsW0ni3FN7OPa4vTlII1Jjuqokky0"
      }
    };
    
    return fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        const image = response.find(i => i.breeds.length > 0);
        const imageUrl = image.url;
        const breed = image.breeds[0];
        const breedName = breed.name;
        const weight = breed.weight.metric + " meters";
        const height = breed.height.metric + " meters";
        const lifeSpan = breed.life_span;
        const temperament = breed.temperament;
        const breedGroup = breed.breed_group;
        setDog(imageUrl, breedName, weight, height, lifeSpan, temperament, breedGroup);
        setLoader(false);
      });
}

getRadomImage();
document.getElementById("btn-random").addEventListener("click", function () {
    getRadomImage();
})