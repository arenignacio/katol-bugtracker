import { useRef, useState } from 'react';
import { API_BASEURL } from '../utils/constants';
import styled from 'styled-components';
import requests from '../utils/requests';

//components
import List from './List';

const Wrapper = styled.div`
	height: 100%;
	width: 100%;

	.comments {
		box-sizing: border-box;
		width: 100%;
		height: 50%;
		border: 1px solid rgba(0, 0, 0, 0.5);
		background: white;

		.title {
			justify-content: center;
		}

		div.list-item {
			width: 100%;
			justify-content: start;
		}
	}

	.comment-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50%;
		width: 100%;

		form {
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			height: 100%;
			width: 80%;

			textarea {
				width: 80%;
				height: 50%;
				border-radius: 5px;
				border: 1px solid gray;
				padding: 10px;
				font-size: 0.8rem;
				font-family: 'times new roman';
				box-sizing: border-box;
				resize: none;

				&:focus {
					outline: none;
				}

				&::-webkit-scrollbar {
					width: 5px;
				}

				&::-webkit-scrollbar-track {
					border-radius: 5px;
					background: rgba(0, 0, 0, 0.5);
				}

				&::-webkit-scrollbar-thumb {
					border-radius: 5px;
					background: pink;
				}
			}

			button {
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 5px;
				border: 1px solid rgba(0, 0, 0, 0.5);
				width: 12%;
				height: 30%;

				&:hover {
					cursor: pointer;
					background: lightgreen;
				}
			}
		}
	}

	.comment {
		display: flex;
		width: 100%;
		font-size: 0.8rem;
		margin-bottom: 10px;

		span.content {
			width: 70%;
		}

		span.author {
			width: 30%;
			padding-top: 1px;
			font-size: 0.7rem;
			font-weight: bold;
		}
	}
`;

const Comments = ({ origin, comments }) => {
	const textArea = useRef();
	const [newComments, setNewComments] = useState();
	const API = requests(API_BASEURL);

	const date = (dateStr) => {
		const date = new Date(dateStr);

		return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
	};

	const handlePost = async (e) => {
		e.preventDefault();
		const data = await API.post('ticket/' + origin + '/comments', {
			content: textArea.current.value,
		});
		console.log('posted', data);
	};

	const renderComments = (comments) => {
		return comments.map((comment) => {
			return [
				<div className="comment">
					<span className="content">
						{comment.content +
							' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, animi sequi perspiciatis possimus '}
					</span>
					<br />
					<span className="author">
						{comment.author}
						<br />
						<span>{date(comment.date)}</span>
					</span>
				</div>,
			];
		});
	};

	const getComments = () => {
		if (newComments) {
			return renderComments(newComments);
		}
		if (comments) {
			return renderComments(comments);
		}
		return [['123', '12321']];
	};

	return (
		<Wrapper comments={comments}>
			<div className="comments">
				<List
					headers={['COMMENTS']}
					content={getComments()}
					attributes={{ isExpandable: true }}
					viewableRows={5}
				/>
			</div>
			<div className="comment-box">
				{' '}
				<form onSubmit={handlePost}>
					<textarea ref={textArea} className="comment-input" type="text" />
					<button type="submit">Post</button>
				</form>{' '}
			</div>
		</Wrapper>
	);
};

export default Comments;
