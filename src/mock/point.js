/* eslint-disable no-unused-vars */
import {getRandomInteger} from '../utils/common.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const pointType = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'];


const optionTaxi = {
  'type': 'taxi',
  'offers': [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    },
  ],
};

export const optionFlight = {
  'type': 'flight',
  'offers': [
    {
      'title': 'Add luggage',
      'price': 50,
    }, {
      'title': 'Switch to comfort',
      'price': 80,
    },
  ],
};

const optionSightseeing = {
  'type': 'sightseeing',
  'offers': [
    {
      'title': 'Book tickets',
      'price': 40,
    }, {
      'title': 'Lunch in city',
      'price': 30,
    },
  ],
};

const offers = [optionTaxi, optionFlight, optionSightseeing];

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const description = text.split('. ');

const photosArr = function() {
  const photos = [];
  for (let i = 0; i <= 5; i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomInteger(1, 450)}`);
  }
  return photos;
};



const createGallery = function () {
  const images = photosArr();
  let gallery = '';
  for (const photo of images) {
    gallery += `<img class="event__photo" src="${photo}" alt="Event photo">`;
  }
  return gallery;
};



export const cities = [
  {
    name: 'Paris',
    img: createGallery(),
  },
  {
    name: 'New-York',
    img: createGallery(),
  },
  {
    name: 'London',
    img: createGallery(),
  },
  {
    name: 'Thorshavn',
    img: createGallery(),
  },
];

export const citiesNames = cities.map((city) => city.name);

// const formatDifference = function () {
//   const hourDayjs = ;
//   const dayDayjs = ;

//   let time = '';
//   if (end.diff(start) > )
//   end.diff(start, time),
// }

export const createPoint = function () {
  const dateFormat = function () {
    const minutes = getRandomInteger(0, 59);
    const hours = getRandomInteger(0, 23);
    const year = 2021;
    const month = getRandomInteger(1, 12);
    const day = getRandomInteger(1, 28);
    const itemDate = String(year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':00');
    return itemDate;
  };
  const start = dayjs(dateFormat());
  const end = dayjs(dateFormat());
  const pointDate = dateFormat();
  // const duration = function() {
  //
  // }

  return {
    id: nanoid(),
    type: pointType[getRandomInteger(0, pointType.length-1)],
    offers: offers[getRandomInteger(0, offers.length-1)]['offers'],
    point: cities[getRandomInteger(0, citiesNames.length-1)].name,
    description: description.slice(0, getRandomInteger(1, description.length)).join('. ') + '.',
    photos: cities[getRandomInteger(0, citiesNames.length-1)].img,
    date: dayjs(dateFormat()).format('MMM DD').toUpperCase(),
    price: getRandomInteger(10, 150),
    startTime: dayjs(start).format('HH:mm'),
    endTime: dayjs(end).format('HH:mm'),
    duration: end.diff(start),
    pointDate,
    isBefore: dayjs(dateFormat()).isBefore(dayjs()),
    isFavorite: false,
  };
};
