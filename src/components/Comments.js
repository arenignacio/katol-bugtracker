import styled from 'styled-components';

//components
import List from './List';

const Wrapper = styled.div`
	height: 100%;
	width: 100%;

	.comments {
		box-sizing: border-box;
		width: 100%;
		height: fit-content;
		border: 1px solid rgba(0, 0, 0, 0.5);
		background: white;

		.title {
			justify-content: center;
		}

		div.list-item {
			justify-content: start;
		}
	}

	.comment-box {
		width: 100%;
		border: 1px solid rgba(250, 0, 0, 0.5);
	}
`;

const Comments = () => {
	return (
		<Wrapper>
			<div className="comments">
				<List
					headers={['COMMENTS']}
					content={[
						[<div style={{ color: 'blue' }}>Hello</div>],
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
					]}
					viewableRows={6}
				/>
			</div>
			<div className="comment-box">box</div>
		</Wrapper>
	);
};

export default Comments;
