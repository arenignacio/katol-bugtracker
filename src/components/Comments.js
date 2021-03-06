import { useEffect, useRef, useState } from 'react';
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
		height: 60%;
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
		height: 40%;
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
				background: hsla(200, 50%, 70%, 1);
				width: 12%;
				height: 30%;

				&:hover {
					cursor: pointer;
					background: hsla(200, 70%, 50%, 1);
				}

				&:active {
					background: hsla(200, 100%, 50%, 1);
					transform: translatey(1px) translatex(1px) scale(0.95);
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
			margin-left: 15px;
		}
	}
`;

const Comments = ({ origin, comments }) => {
	const textArea = useRef();
	const [newComments, setNewComments] = useState();
	const API = requests(API_BASEURL);

	useEffect(() => {
		setNewComments(comments);
	}, [comments]);

	const date = (dateStr) => {
		const date = new Date(dateStr);
		const hours = [
			'00',
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
			'08',
			'09',
			'10',
			'11',
			'12',
			'13',
			'14',
			'15',
			'16',
			'17',
			'18',
			'19',
			'20',
			'21',
			'22',
			'23',
		];

		return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()} ${
			hours[date.getHours()]
		}:${date.getMinutes()}`;
	};

	const handlePost = async (e) => {
		e.preventDefault();
		const data = await API.post('ticket/' + origin + '/comments', {
			content: textArea.current.value,
		});
		textArea.current.value = '';
		setNewComments(data.reverse());
	};

	const renderComments = (comments) => {
		return comments.map((comment) => {
			return [
				<div className="comment">
					<span className="content">{comment.content}</span>
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
					viewableRows={6}
				/>
			</div>
			<div className="comment-box">
				{' '}
				<form onSubmit={handlePost}>
					<textarea
						maxLength="150"
						ref={textArea}
						className="comment-input"
						type="text"
					/>
					<button type="submit">Post</button>
				</form>{' '}
			</div>
		</Wrapper>
	);
};

export default Comments;
