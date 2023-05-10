import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TalkDetail from '../components/TalkDetail';
import TalkItem from '../components/TalkItem';
import TalkReplyInput from '../components/TalkReplyInput';
import { asyncReceiveTalkDetail, asyncToggleLikeTalkDetail } from '../states/talkDetail/action';
import { asyncAddTalk } from '../states/talks/action';

function DetailPage() {
  const firstRun = React.useRef(true);
  const { id } = useParams();
  const {
    talkDetail = null,
    authUser,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncReceiveTalkDetail(id));
      firstRun.current = false;
    }
  }, [id, dispatch]);

  const onLikeTalk = () => {
    dispatch(asyncToggleLikeTalkDetail());
  };

  const onReplyTalk = (text) => {
    dispatch(asyncAddTalk({ text, replyTo: id }));
  };

  if (!talkDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      {
        talkDetail.parent && (
          <div className="detail-page__parent">
            <h3>Replying To</h3>
            <TalkItem {...talkDetail.parent} authUser={authUser.id} />
          </div>
        )
      }
      <TalkDetail {...talkDetail} authUser={authUser.id} likeTalk={onLikeTalk} />
      <TalkReplyInput replyTalk={onReplyTalk} />
    </section>
  );
}

export default DetailPage;
