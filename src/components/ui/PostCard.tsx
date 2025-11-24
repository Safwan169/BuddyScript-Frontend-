'use client';
import React, { useState } from 'react';
// (Interface Definitions and Icon Components remain the same)
// ... (assuming RecentComment, PostData, PostComponentProps, ThreeDotsIcon, DefaultLikeIcon are here)

interface RecentComment {
    commenterName: string;
    commenterImage: string;
    commentText: string;
    commentTime: string;
    totalLikes: number;
}

interface PostData {
    id: number;
    userName: string;
    userProfileImage: string;
    timeAgo: string;
    postVisibility: string;
    postTitle: string;
    postImage: string;
    reactionCount: number;
    commentCount: number;
    shareCount: number;
    previewReactions: string[];
    previousCommentsCount: number;
    recentComment: RecentComment;
}

interface PostComponentProps {
    postData: PostData;
}

// Placeholder for a default "Like" button icon (ThumbUp)
const DefaultLikeIcon = ({ color = '#000' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
);
const ThreeDotsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
        <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
        <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
        <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
    </svg>
);


export const PostComponent: React.FC<PostComponentProps> = ({ postData }) => {
    const [showReactionPopup, setShowReactionPopup] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [commentText, setCommentText] = useState('');

    const reactions = [
        { name: 'Like', icon: '👍', color: '#1877f2' },
        { name: 'Love', icon: '❤️', color: '#f33e5b' },
        { name: 'Haha', icon: '😂', color: '#f7b125' },
        { name: 'Wow', icon: '😮', color: '#f7b125' },
        { name: 'Sad', icon: '😢', color: '#f7b125' },
        { name: 'Angry', icon: '😠', color: '#e9710f' }
    ];
    
    // --- FIX APPLIED HERE ---
    // 1. Try to find the reaction object based on selectedReaction.
    const selectedReactionObject = selectedReaction
        ? reactions.find(r => r.name === selectedReaction)
        : null;

    // 2. Define currentReaction. It is guaranteed to be an object.
    const currentReaction = selectedReactionObject
        ? selectedReactionObject
        : { name: 'Like', icon: <DefaultLikeIcon />, color: '#000' };
    // --- END FIX ---


    const handleReactionClick = (reactionName: string) => {
        if (selectedReaction === reactionName) {
            setSelectedReaction(null);
        } else {
            setSelectedReaction(reactionName);
        }
        setShowReactionPopup(false);
    };
    
    const handleMainReactionClick = () => {
        if (selectedReaction) {
            setSelectedReaction(null);
        } else {
            setSelectedReaction('Like');
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Comment submitted:', commentText);
        setCommentText('');
    };

    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                {/* Post Header */}
                <div className="_feed_inner_timeline_post_top">
                    <div className="_feed_inner_timeline_post_box">
                        <div className="_feed_inner_timeline_post_box_image">
                            <img src={postData.userProfileImage} alt={postData.userName} className="_post_img" />
                        </div>
                        <div className="_feed_inner_timeline_post_box_txt">
                            <h4 className="_feed_inner_timeline_post_box_title">{postData.userName}</h4>
                            <p className="_feed_inner_timeline_post_box_para">
                                {postData.timeAgo} · <a href="#0">{postData.postVisibility}</a>
                            </p>
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="_feed_inner_timeline_post_box_dropdown">
                        <div className="_feed_timeline_post_dropdown">
                            <button
                                className="_feed_timeline_post_dropdown_link"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <ThreeDotsIcon />
                            </button>
                        </div>

                        {showDropdown && (
                            <div className="_feed_timeline_dropdown">
                                {/* ... Dropdown list items ... */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Post Title & Image */}
                <h4 className="_feed_inner_timeline_post_title">{postData.postTitle}</h4>
                {postData.postImage && (
                    <div className="_feed_inner_timeline_image">
                        <img src={postData.postImage} alt="Post" className="_time_img" />
                    </div>
                )}
            </div>

            {/* Reaction Summary (unchanged) */}
            <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
                <div className="_feed_inner_timeline_total_reacts_image">
                    {postData.previewReactions.slice(0, 5).map((reaction, index) => (
                        <img
                            key={index}
                            src={reaction}
                            alt="Reaction"
                            className={`${index === 0 ? '_react_img1' : '_react_img'} ${index > 1 ? '_rect_img_mbl_none' : ''}`}
                        />
                    ))}
                    <p className="_feed_inner_timeline_total_reacts_para">{postData.reactionCount}+</p>
                </div>
                <div className="_feed_inner_timeline_total_reacts_txt">
                    <p className="_feed_inner_timeline_total_reacts_para1">
                        <span>{postData.commentCount}</span> Comment
                    </p>
                    <p className="_feed_inner_timeline_total_reacts_para2">
                        <span>{postData.shareCount}</span> Share
                    </p>
                </div>
            </div>

            {/* Reaction Buttons with Popup (Using the fixed currentReaction) */}
            <div className="_feed_inner_timeline_reaction">
                <div 
                    className='_feed_inner_timeline_reaction_emoji _feed_reaction' 
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setShowReactionPopup(true)}
                    onMouseLeave={() => setShowReactionPopup(false)}
                >
                    <button
                        className={`_feed_inner_timeline_reaction_emoji _feed_reaction`}
                        onClick={handleMainReactionClick}
                        style={{ color: currentReaction.color, fontWeight: selectedReaction ? 'bold' : 'normal' }}
                    >
                        <span className="_feed_inner_timeline_reaction_link">
                            <span>
                                {/* Display the icon/emoji */}
                                <span style={{ fontSize: selectedReaction ? '20px' : '16px', marginRight: '5px' }}>
                                    {typeof currentReaction.icon === 'string' 
                                        ? currentReaction.icon 
                                        : <DefaultLikeIcon color={selectedReaction ? currentReaction.color : '#000'} />
                                    }
                                </span>
                                {/* Display the reaction name */}
                                {currentReaction.name}
                            </span>
                        </span>
                    </button>

                    {/* Reaction Popup */}
                    {showReactionPopup && (
                        <div
                            className="_feed_reaction_options"
                            style={{
                                position: 'absolute',
                                bottom: 'calc(100% + 2px)',
                                left: '100%',
                                transform: 'translateX(-50%)',
                                backgroundColor: 'white',
                                borderRadius: '50px',
                                padding: '8px 12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                display: 'flex',
                                gap: '8px',
                                zIndex: 1000,
                            }}
                        >
                            {reactions.map((reaction) => (
                                <button
                                    key={reaction.name}
                                    onClick={() => handleReactionClick(reaction.name)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '28px',
                                        padding: '4px',
                                        transition: 'transform 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    title={reaction.name}
                                >
                                    {reaction.icon}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
                    {/* ... Comment SVG ... */}
                    <span>Comment</span>
                </button>

                <button className="_feed_inner_timeline_reaction_share _feed_reaction">
                    {/* ... Share SVG ... */}
                    <span>Share</span>
                </button>
            </div>

              <div className="_feed_inner_timeline_cooment_area">
                    <div className="_feed_inner_comment_box">
                      <form className="_feed_inner_comment_box_form">
                        <div className="_feed_inner_comment_box_content">
                          <div className="_feed_inner_comment_box_content_image">
                            <img src="assets/images/comment_img.png" alt="" className="_comment_img" />
                          </div>
                          <div className="_feed_inner_comment_box_content_txt">
                            <textarea className="form-control _comment_textarea" placeholder="Write a comment" id="floatingTextarea2"></textarea>
                          </div>
                        </div>
                        <div className="_feed_inner_comment_box_icon">
                          <button className="_feed_inner_comment_box_icon_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                              <path fill="#000" fill-opacity=".46" fill-rule="evenodd" d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z" clip-rule="evenodd" />
                            </svg>
                          </button>
                          <button className="_feed_inner_comment_box_icon_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                              <path fill="#000" fill-opacity=".46" fill-rule="evenodd" d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z" clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="_timline_comment_main">
                    <div className="_previous_comment">
                      <button type="button" className="_previous_comment_txt">View 4 previous comments</button>
                    </div>
                    <div className="_comment_main">
                      <div className="_comment_image">
                        <a href="profile.html" className="_comment_image_link">
                          <img src="assets/images/txt_img.png" alt="" className="_comment_img1" />
                        </a>
                      </div>
                      <div className="_comment_area">
                        <div className="_comment_details">
                          <div className="_comment_details_top">
                            <div className="_comment_name">
                              <a href="profile.html ">
                                <h4 className="_comment_name_title">Radovan SkillArena</h4>
                              </a>
                            </div>
                          </div>
                          <div className="_comment_status">
                            <p className="_comment_status_text"><span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </span></p>
                          </div>
                          <div className="_total_reactions">
                            <div className="_total_react">
                              <span className="_reaction_like">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                              </span>
                              <span className="_reaction_heart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                              </span>
                            </div>
                            <span className="_total">
                              198
                            </span>
                          </div>
                          <div className="_comment_reply">
                            <div className="_comment_reply_num">
                              <ul className="_comment_reply_list">
                                <li><span>Like.</span></li>
                                <li><span>Reply.</span></li>
                                <li><span>Share</span></li>
                                <li><span className="_time_link">.21m</span></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="_feed_inner_comment_box">
                          <form className="_feed_inner_comment_box_form">
                            <div className="_feed_inner_comment_box_content">
                              <div className="_feed_inner_comment_box_content_image">
                                <img src="assets/images/comment_img.png" alt="" className="_comment_img" />
                              </div>
                              <div className="_feed_inner_comment_box_content_txt">
                                <textarea className="form-control _comment_textarea" placeholder="Write a comment" id="floatingTextarea2"></textarea>
                              </div>
                            </div>
                            <div className="_feed_inner_comment_box_icon">
                              <button className="_feed_inner_comment_box_icon_btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                  <path fill="#000" fill-opacity=".46" fill-rule="evenodd" d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z" clip-rule="evenodd"></path>
                                </svg>
                              </button>
                              <button className="_feed_inner_comment_box_icon_btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                  <path fill="#000" fill-opacity=".46" fill-rule="evenodd" d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z" clip-rule="evenodd"></path>
                                </svg>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
    );
};