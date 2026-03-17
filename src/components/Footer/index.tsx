import { styled } from '@umijs/max';
import React from 'react';
// @ts-ignore
import {mediaQueries} from '@/styles/breakpoints.ts';
import useDebouncedWindowSize from '@/hooks/useDebouncedWindowSize';
import styles from './index.less';
// import { GithubOutlined } from '@/';
// import icon_github from '@/assets/images/icon_github.png';
// import icon_github2 from '@/assets/images/icon_github2.png';
// import icon_github3 from '@/assets/images/icon_github3.png';
// import logoImage from '@/assets/images/logo.png';

interface FooterProps {
  backgroundColor?: string
}

const FooterContainer = styled('footer')`
  background: #FAFAFB;
  color: white;
  position: relative;
`;

const Container = styled('div')`
  max-width: 1260px;
  margin: 0 auto;
  padding: 30px 36px;
  border-top: 2px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaQueries.laptop} {
    max-width: 1200px;
  }

  ${mediaQueries.tablet} {
    max-width: 960px;
    gap: 20px;
  }

  ${mediaQueries.mobile} {
    max-width: 720px;
    gap: 15px;
  }

  ${mediaQueries.phone} {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const Logo = styled('div')`
  display: flex;
  align-items: center;

  img {
    height: auto;
    width: 207px;
    // margin-right: 12px;
  }

  ${mediaQueries.laptop} {
    img {
      width: 180px;
    }
  }

  ${mediaQueries.tablet} {
    img {
      max-width: 160px;
    }
  }

  ${mediaQueries.mobile} {
    img {
      max-width: 160px;
      
    }
  }

  ${mediaQueries.phone} {
    img {
      max-width: 110px;
      
    }
  }

  span {
    font-size: 18px;
    color: white;
    opacity: 0.9;
  }
`;

const NavLinks = styled('div')`
  display: flex;
  align-items: center;
  gap: 40px;

  ${mediaQueries.laptop} {
    gap: 30px;
  }

  ${mediaQueries.tablet} {
    gap: 20px;
  }

  ${mediaQueries.mobile} {
    gap: 15px;
  }

  ${mediaQueries.phone} {
    gap: 10px;
  }
`;

const FooterText = styled('div')`
  font-family: Montserrat-Medium;
  font-size: 14px;
  color: #787680;
  letter-spacing: 0.49px;
  text-align: center;

  ${mediaQueries.laptop} {
    font-size: 13px;
  }

  ${mediaQueries.tablet} {
    font-size: 12px;
  }

  ${mediaQueries.mobile} {
    font-size: 11px;
  }

  ${mediaQueries.phone} {
    font-size: 8px;
  }
`;

const IconLinks = styled('div')`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 0px;

  a {
    color: rgba(255, 255, 255, 0.7);
    font-size: 20px;
    transition: all 0.3s ease;
    img {
      width: 21px;
      margin-right: 14px;
      &.inclusion{
        width: 34px
      }
    }

    &:hover {
      color: white;
    }
  }

  ${mediaQueries.laptop} {
    gap: 15px;
  }

  ${mediaQueries.tablet} {
    gap: 12px;
  }

  ${mediaQueries.mobile} {
    gap: 10px;
  }

  ${mediaQueries.phone} {
    gap: 8px;
    a {
      img {
        width: 14px;
        margin-right: 14px;
        &.inclusion{
          width: 24px
        }
      }
    }
  }
  
`;

const IconLinksWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-left: 0px;
  font-size: 20px;

  .div {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin-left: 0px;
    font-size: 20px;
  }

  ${mediaQueries.laptop} {
    gap: 5px;
    font-size: 18px;
  }

  ${mediaQueries.tablet} {
    gap: 4px;
    font-size: 16px;
  }

  ${mediaQueries.mobile} {
    gap: 3px;
    font-size: 14px;
  }

  ${mediaQueries.phone} {
    gap: 2px;
    font-size: 10px;
  }
`;

const Footer = (props: FooterProps) => {
  const { backgroundColor } = props;
  const { width } = useDebouncedWindowSize();
  const ifBigSize = width >= 750;

  return (
    <>
     {ifBigSize && (
        <FooterContainer style={backgroundColor ? { backgroundColor } : {}}>
          <Container>
            <div>
              <Logo>
                {/* <img src={logoImage} alt="Logo" /> */}
                <img
                  src={
                    'https://mdn.alipayobjects.com/huamei_u4gqjv/afts/img/7uHaQIkuaScAAAAAAAAAAAAADjNIAQFr/original'
                  }
                  alt="Logo"
                />
              </Logo>
              {/* <FooterText>AI BUILT BY EVERYONE, USED BY EVERYONE</FooterText> */}
            </div>
            <FooterText>© 2025 IAI</FooterText>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <NavLinks>
                {/* <NavLink href="/about">About</NavLink>
                <NavLink href="/research">Research</NavLink>
                <NavLink href="/releases">Releases</NavLink>
                <NavLink href="/leaderboard">Leaderboard</NavLink>
                <NavLink href="/careers">Careers</NavLink> */}
                <IconLinksWrapper>
                  <IconLinks>
                    <a
                      href="https://github.com/inclusionAI"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* <img src={icon_github} alt="Github" /> */}
                      <img
                        src={
                          'https://mdn.alipayobjects.com/huamei_u4gqjv/afts/img/zdrXTIVL48IAAAAAAAAAAAAADjNIAQFr/original'
                        }
                        alt="Github"
                      />
                    </a>
                  </IconLinks>
                  <IconLinks>
                    <a
                      
                      href="https://www.modelscope.cn/organization/inclusionAI"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* <GithubOutlined /> */}
                      {/* <img src={icon_github2} alt="modelscope" /> */}
    
                      <img
                      className='inclusion'
                        src={
                          'https://mdn.alipayobjects.com/huamei_u4gqjv/afts/img/Vp8GRaFti38AAAAAAAAAAAAADjNIAQFr/original'
                        }
                        alt="modelscope"
                      />
                    </a>
                  </IconLinks>
                  <IconLinks>
                    <a
                      href="https://huggingface.co/inclusionAI"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* <GithubOutlined /> */}
                      {/* <img src={icon_github3} alt="huggingface" /> */}
                      <img
                        
                        src={
                          'https://mdn.alipayobjects.com/huamei_u4gqjv/afts/img/CljuTr0byUAAAAAAAAAAAAAADjNIAQFr/original'
                        }
                        alt="huggingface"
                      />
                    </a>
                  </IconLinks>
                </IconLinksWrapper>
              </NavLinks>
              {/* <IconLinks>
                <a href="https://github.com/inclusionAI" target="_blank" rel="noopener noreferrer">
                  <GithubOutlined />
                </a>
              </IconLinks> */}
            </div>
          </Container>
        </FooterContainer>
     )}

     {!ifBigSize && (
      <div className={styles.footerContainer} style={backgroundColor ? { backgroundColor } : {}}>
        <div className={styles.footer}>
          <img className={styles.footerIcon} src="https://mdn.alipayobjects.com/huamei_u4gqjv/afts/img/7uHaQIkuaScAAAAAAAAAAAAADjNIAQFr/original" alt="" />
          <div className={styles.text}>© 2025 IAI</div>
        </div>
      </div>
     )}
    </>
  );
};

export default Footer;
