jest.mock('../data/services/get-token');

import { getAuthToken } from '../data/services/get-token';
import { getHomePageData, getCourseById } from '../data/loader';

describe('getHomePageData', () => {
  it('should return courses', () => {
    getAuthToken.mockResolvedValue('xyz');
    const courses = [
      {
        id: 1,
        name: 'Course 1',
        description: 'Description 1',
        image: 'image 1',
        slug: 'course-1',
      },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(courses),
      })
    );
    return getHomePageData().then((response) =>
      expect(response[0].id).toBe(courses[0].id)
    );
  });
});
describe('getCourseById', () => {
  it('should return a course', () => {
    getAuthToken.mockResolvedValue('xyz');
    const course = {
      id: 1,
      name: 'Course 1',
      description: 'Description 1',
      image: 'image 1',
      slug: 'course-1',
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(course),
      })
    );
    return getCourseById('1').then((response) =>
      expect(response.id).toBe(course.id)
    );
  });
});
