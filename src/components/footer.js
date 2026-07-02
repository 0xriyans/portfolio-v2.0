import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    padding: 10px;
  }

  .sys-log {
    color: var(--pink);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    opacity: 0.7;
    letter-spacing: 2px;
    margin-top: 20px;
    transition: var(--transition);
    
    &:hover {
      opacity: 1;
      text-shadow: 0 0 8px rgba(184, 255, 0, 0.8);
    }
  }
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://api.github.com/repos/0xriyans/v4')
      .then(response => response.json())
      .then(json => {
        const { stargazers_count, forks_count } = json;
        setGitHubInfo({
          stars: stargazers_count,
          forks: forks_count,
        });
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit>
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
