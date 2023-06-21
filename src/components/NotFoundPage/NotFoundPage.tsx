import Link from 'components/common/Link';
import * as Styled from './NotFoundPage.styled';
import { HOME_URL } from 'constants/route';

export default function NotFoundPage() {
  return (
    <Styled.NotFoundPage>
      <strong>페이지를 찾을 수 없어요</strong>
      <Link to={HOME_URL} underline>
        홈으로 가기
      </Link>
    </Styled.NotFoundPage>
  );
}
