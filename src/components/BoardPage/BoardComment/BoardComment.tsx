/* eslint-disable jsx-a11y/no-static-element-interactions */
import { UserSave } from "@gongdongho12/npm-usersave-api/dist/meta";
import { Avatar, Button, Comment, Form, Input, List, message } from "antd";
import { userSave } from "api";
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useRecoilValue } from "recoil";
import accountState from "state/account";
import isEmpty from "utils/isEmpty";
import { DeleteOutlined } from "@ant-design/icons"

interface IBoardCommentProps {
	query: string;
	commentList: any[];
	refresh: () => void;
}

const { TextArea } = Input;

const CommentEditor = ({ onChange, onSubmit, submitting, value }) => (
	<>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button
				htmlType="submit"
				loading={submitting}
				onClick={onSubmit}
				type="primary"
			>
				Add Comment
			</Button>
		</Form.Item>
	</>
);

const CommentList = ({ comments, onDelete }) => {
  return (
		<List
			dataSource={comments}
			header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
			itemLayout="horizontal"
      renderItem={(comment: UserSave) => {
        const { id, data, userId } = comment;
        return (
          <Comment
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            actions={[
              <span key="comment-nested-reply-to">Reply to</span>,
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <span key="comment-delete" onClick={() => {
                onDelete(id)
              }}>
                <span className="comment-action">
                  Delete <DeleteOutlined />
                </span>
              </span>
            ]}
						key={id}
            content={<div>
              {data}
            </div>}
            author={<span>{userId}</span>}
          >
            
          </Comment>
        );
      }}
		/>
  );
};

const BoardComment: FunctionComponent<IBoardCommentProps> = (props) => {
  const { commentList, query, refresh } = props;
  const account = useRecoilValue(accountState);
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addSaveUserComment = useCallback(
    (value: string) => {
      return userSave
        .addUserSave({
          dataKey: `${query}comment`,
          data: value,
          private: false,
        })
        .then((data: UserSave) => {
          console.log("comment data", data);
          message.success("????????? ??????????????? ?????????????????????.");
        });
    },
    [query]
  );

  const deleteSaveUserComment = useCallback((id: number) => {
    userSave
      .deleteUserSave(id)
      .then((data: UserSave) => {
        message.success("????????? ??????????????? ?????????????????????.");
      }).then(() => {
        refresh();
      });
  }, [])

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);
    addSaveUserComment(value).then(() => {
      refresh();
      setSubmitting(false);
      setValue("");
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
		<div>
			{commentList.length > 0 && <CommentList comments={commentList} onDelete={deleteSaveUserComment} />}
			{!isEmpty(account) && (
				<Comment
					avatar={
						<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
					}
					content={
						<CommentEditor
							onChange={handleChange}
							onSubmit={handleSubmit}
							submitting={submitting}
							value={value}
						/>
					}
				/>
			)}
		</div>
  );
};

export default BoardComment;
