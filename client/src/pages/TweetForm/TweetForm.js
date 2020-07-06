import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/tweet';

const TweetForm = ({ addPost, auth }) => {

    const [text, setText] = useState('');

    return (
        <Fragment>
            <h1>tweet form</h1>
            <div className='border p-1'>
            <form className='my-1' onSubmit={e => {
                e.preventDefault();
                addPost({ text });
                setText('');
            }} >
                <div className='d-flex flex-row' >
                <img className='mr-2' style={{ width: '49px', height: '49px', borderRadius: '50%' }} src={auth.user.avatar} alt='avatar'/>
                <textarea
                    name='text'
                    rows='3'
                    style={{ width: '100%' }}
                    placeholder='Whats Happening'
                    required
                    value={text}
                    onChange={e => setText(e.target.value)}
                >
                </textarea>
                </div>
                <br/>
                <input type="submit" className='btn btn-sm mr-0 btn-dark my-1' value='Submit'/>

            </form>
            </div>
            
        </Fragment>
    )
}

TweetForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addPost })(TweetForm)