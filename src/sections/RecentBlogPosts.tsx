import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { SectionBase } from "types";
import { RecentBlogPost, Section } from "components";

export interface RecentBlogPostsSectionData extends SectionBase {
  type: "recentBlogPosts";
}

type PostNode = {
  frontmatter: {
    title: string;
    image: {
      childImageSharp: {
        fluid: any;
      };
    };
    summary: string;
    date: string;
  };
  fields: {
    slug: string;
  };
};

export const RecentBlogPosts: React.FC<RecentBlogPostsSectionData> = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "blogPost" } } }
        limit: 3
      ) {
        nodes {
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 1440, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            summary
            date(fromNow: true)
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  const posts: PostNode[] = data.allMarkdownRemark.nodes;

  return (
    <Section>
      <h3>From our blog:</h3>
      <div className="recent-media-list">
        {posts.map((post) => (
          <RecentBlogPost
            className="recent-media-list-item"
            {...post.frontmatter}
            imgFluid={post.frontmatter.image.childImageSharp.fluid}
            slug={post.fields.slug}
            key={post.fields.slug}
          />
        ))}
      </div>
    </Section>
  );
};