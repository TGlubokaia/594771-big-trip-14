/* eslint-disable no-unused-vars */
import {getRandomInteger} from '../utils.js';
import dayjs from 'dayjs';

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

export const pointName = ['Paris', 'New-York', 'London', 'Thorshavn', 'Santiago'];


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

const startTime = ['11:30', '12:00', '13:00'];
const endTime = ['13:30', '14:15', '15:40'];

export const createPoint = function () {
  const dateFormat = '2021-05-28';
  const start = dayjs(dateFormat + 'T' + startTime[getRandomInteger(0, startTime.length-1)]);
  const end = dayjs(dateFormat + 'T' + endTime[getRandomInteger(0, endTime.length-1)]);

  return {
    type: pointType[getRandomInteger(0, pointType.length-1)],
    offers: offers[getRandomInteger(0, offers.length-1)]['offers'],
    point: pointName[getRandomInteger(0, pointName.length-1)],
    description: description.slice(0, getRandomInteger(1, description.length)).join('. ') + '.',
    photos: photosArr(),
    date: dayjs(dateFormat).format('MMM DD').toUpperCase(),
    price: getRandomInteger(10, 150),
    startTime: dayjs(start).format('HH:mm'),
    endTime: dayjs(end).format('HH:mm'),
    duration: end.diff(start, 'minute'),
    dateFormat,
  };
};

