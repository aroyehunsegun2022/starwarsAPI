import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCarAlt, FaSpaceShuttle } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { Loading } from '../../components/Loading';
import { useCharacter } from '../../hooks/useCharacter';
import { api } from '../../services/api';
import { Character } from '../../types/Character.type';
import { getUrlId } from '../../utils/getUrlId';
import { CharacterContainer, Container } from './styles';

export default function CharacterPage() {
  const [data, setData] = useState<Character>();
  const {
    films,
    homeWorld,
    starships,
    vehicles,
    isLoading: isLoadingCharacter,
  } = useCharacter(data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getCharacterData = useCallback(async () => {
    try {
      const response = await api.get(`/people/${id}`);
      setData(response.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCharacterData();
  }, [getCharacterData]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <CharacterContainer>
          <div className="character-data">
            <div className="character-data-details">
              <h1>{data?.name}</h1>
              <p>
                Name:
                {' '}
                <span>{homeWorld.name}</span>
              </p>

              <p>
                Date of Birth:
                {' '}
                <span>{data?.birth_year}</span>
              </p>

              <p>
                Gender:
                {' '}
                <span>{data?.gender}</span>
              </p>

              <p>
                Height:
                {' '}
                <span>
                  {data?.height}
                  {' '}
                  cm
                </span>
              </p>

              <p>
                Weight:
                {' '}
                <span>
                  {data?.mass}
                  {' '}
                  kg
                </span>
              </p>

              <p>
                Skin Colour:
                {' '}
                <span>{data?.skin_color}</span>
              </p>

              <p>
                Eye Colour:
                {' '}
                <span>{data?.eye_color}</span>
              </p>

              <p>
                Hair Color:
                {' '}
                <span>{data?.hair_color}</span>
              </p>
            </div>

            <div className="character-data-others">
              {isLoadingCharacter ? (
                <Loading />
              ) : (
                <>
                  <div className="character-data-others-data">
                    <h2>Star Ships</h2>

                    {starships.length > 0 ? (
                      <ul>
                        {starships.map((starship) => (
                          <li key={starship.name}>
                            <Link to={`/starships/${getUrlId(starship.url)}`}>
                              <FaSpaceShuttle />
                              {starship.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No Data Found.</span>
                    )}
                  </div>

                  <div className="character-data-others-data">
                    <h2>Cars</h2>
                    {vehicles.length > 0 ? (
                      <ul>
                        {vehicles.map((vehicle) => (
                          <li key={vehicle.name}>
                            <Link to={`/vehicles/${getUrlId(vehicle.url)}`}>
                              <FaCarAlt />
                              {vehicle.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No Data Founds.</span>
                    )}
                  </div>

                  <div className="character-data-others-data">
                    <h2>Films</h2>
                    <ul>
                      {films.map((film) => (
                        <li key={film.title}>
                          <Link to={`/films/${getUrlId(film.url)}`}>
                            <MdMovie />
                            {film.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="character-image">
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt={`Image ${data?.name}`}
            />
          </div>
        </CharacterContainer>
      )}
    </Container>
  );
}
