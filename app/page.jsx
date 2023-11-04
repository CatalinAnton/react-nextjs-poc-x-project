import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Homepage: check it out
            <br className="" />
            <span className="orange_gradient text-center">
                SFCC & Web Developer
            </span>
        </h1>
        <p className="desc text-center">
            Next.js recently became theofficial React framework as outlined in React docs. In this course, you'll learn the most important Next.js concepts and how they fit into the React ecosystem. Finally, you'll put your skills to the test by building a modern full-stack Next 13 application.
        </p>

        <Feed />
    </section>
  )
}

export default Home