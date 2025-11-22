import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import pokemonImg from '../images/pokemon.jpg'
import bolaImg from '../images/bola.jpg'
import monsterImg from '../images/monsterhigh.jpg'

function Landing() {
	return (
		<div>
            <Navbar></Navbar>
            <Hero></Hero>
            <FeatureSection
                imagen={pokemonImg}
                title="Pokemón"
                text={"Examina los datos reunidos acerca de las famosas criaturas del universo Pokemón."}
                cta={<a href="/pokemon" className="inline-block mt-4 px-5 py-3 bg-white text-amethyst rounded-md font-semibold">Ver Pokédex</a>}
            >
            </FeatureSection>
            <FeatureSection
                imagen={bolaImg}
                title="Bola Mágica"
                text={"¿Te cuesta tomar decisiones por ti mismo? La bola mágica te dice que hacer, sin tener que pensar en las consecuencias de tus actos."}
                cta={<a href="/pokemon" className="inline-block mt-4 px-5 py-3 bg-white text-amethyst rounded-md font-semibold">Tomar decisiones</a>}
            >
            </FeatureSection>
            <FeatureSection
                imagen={monsterImg}
                title="Monster High"
                text={"Revisa en detalle toda la información recopilada acerca de las estudiantes de Monster High, incluyendo su personalidad, edad, especie y nombre."}
                cta={<a href="/pokemon" className="inline-block mt-4 px-5 py-3 bg-white text-amethyst rounded-md font-semibold">Revisar estudiantes</a>}
            >
            </FeatureSection>
        </div>
	)
}

export default Landing
