import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getHomePageData } from '@/data/loader';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  courseimage: any;
}

function CourseCard({
  id,
  title,
  description,
  courseimage,
}: Readonly<CourseCardProps>) {
  return (
    <a href={`/courses/${id}`}>
      <Card className='relative'>
        <CardHeader>
          <CardTitle className='leading-8 text-pink-500'>{title}</CardTitle>
        </CardHeader>
        <CardContent>{description}</CardContent>
      </Card>
    </a>
  );
}

export default async function Home() {
  const courses = (await getHomePageData()).data;
  return (
    <div className='grid grid-cols-1 gap-4 p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {courses &&
          courses.map((item: CourseCardProps) => (
            <CourseCard key={item.id} {...item} />
          ))}
      </div>
    </div>
  );
}
