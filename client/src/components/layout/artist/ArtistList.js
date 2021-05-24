import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArtistList } from "../../../actions/artist";
import { Link } from "react-router-dom";
import Modal from "../shared/Modal";
import CreateArtist from "./CreateArtist";

import "./ArtistList.css";

const ArtistList = () => {
  const artistList = useSelector((state) => state.artist.artistList);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  useEffect(() => {
    dispatch(getArtistList());
  }, []);

  return (
    <Fragment>
      <div className='artist-list__header'>
        <h2>Artists</h2>
        <button type='button' onClick={(e) => showFormHandler(e)}>
          Submit New Artist
        </button>
        <Modal show={showForm} onClick={showFormHandler}>
          <CreateArtist />
        </Modal>
      </div>
      {artistList &&
        Object.keys(artistList).map((letter, i) => {
          return artistList[letter].map((artist, j) => {
            return (
              <p key={artist + j}>
                {j === 0 ? <h3>{letter}</h3> : ""}
                <Link to={`/artists/${artist.slug}`} className='list-item-link'>
                  {artist.name}
                </Link>
              </p>
            );
          });
        })}
    </Fragment>
  );
};

export default ArtistList;
