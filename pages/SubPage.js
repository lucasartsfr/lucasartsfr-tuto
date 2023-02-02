import { useRouter } from 'next/router';

const SubPage = () => {
  const router = useRouter();
  const { subPage } = router.query;

  return <p>This is sub page: {subPage}</p>;
};

const MyPage = () => {
  return (
    <>
      <h1>My Page</h1>
      <SubPage />
    </>
  );
};

export default MyPage;