import { getCourseById } from '@/data/loader';
import { getUserMeLoader } from '@/data/services/get-user-me-loader';
import { getStrapiURL } from '@/lib/utils';

interface ParamsProps {
  params: {
    courseid: string;
  };
}

const baseUrl = getStrapiURL();

export default async function CourseCardRoute({
  params,
}: Readonly<ParamsProps>) {
  const course = await getCourseById(params.courseid);
  const user = await getUserMeLoader();
  return (
    <>
      <div className='course grid grid-cols-1 md:grid-cols-12 gap-4 bg-gray-100 p-4 rounded-md shadow-md'>
        <div className='course__content col-span-full md:col-span-8'>
          <h2 className='course__title text-2xl font-semibold text-center md:text-left mb-4'>
            {course.title}
          </h2>

          <div className='sections'>
            {course.sections.map((sec: any) => (
              <div key={sec.id} className='section flex flex-col gap-2 mb-4'>
                <h3 className='section__title text-xl font-medium text-center md:text-left mb-2'>
                  {sec.title}
                </h3>

                <ul className='videos list-none p-0 m-0'>
                  {sec.videos.map((vid: any) => (
                    <li
                      key={vid.id}
                      className='video hover:bg-gray-200 rounded-md px-4 py-2 cursor-pointer'
                    >
                      {user.ok ? (
                        <a
                          href={`${vid.url.url}`}
                          className='video__link text-blue-500 hover:underline'
                        >
                          {vid.title}
                        </a>
                      ) : (
                        vid.title
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='course__aside hidden md:block col-span-4 bg-gray-200 p-4 rounded-md'></div>
      </div>
    </>
  );
}
