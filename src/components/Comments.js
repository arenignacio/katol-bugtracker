import styled from 'styled-components';

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
		border: 1px solid rgba(250, 0, 0, 0.5);

		form {
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			height: 60%;
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
			}

			button {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 12%;
				height: 50%;

				&:hover {
					cursor: pointer;
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

const Comments = ({ comments }) => {
	console.log(comments);

	const date = (dateStr) => {
		const date = new Date(dateStr);

		return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
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

	return (
		<Wrapper comments={comments}>
			<div className="comments">
				<List
					headers={['COMMENTS']}
					content={
						comments
							? renderComments(comments)
							: [
									[<div style={{ color: 'blue' }}>{'hello'}</div>],
									['2'],
									['3'],
									['4'],
									['5'],
									['6'],
									['7'],
									['8'],
									['9'],
									['10'],
									['11'],
									['12'],
							  ]
					}
					attributes={{ isExpandable: true }}
					viewableRows={5}
				/>
			</div>
			<div className="comment-box">
				{' '}
				<form>
					<textarea className="comment-input" type="text" name="" id="" />
					<button type="submit">Post</button>
				</form>{' '}
			</div>
		</Wrapper>
	);
};

export default Comments;
