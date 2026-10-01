import ScrollStrokePath from '@/components/ScrollStrokePath'
import ArtistIntro from '@/components/ArtistIntro'
import CatalogFloorMap from '@/components/CatalogFloorMap'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import EducationSection from '@/components/EducationSection'

export default function Home() {
  return (
    <>
      <ScrollStrokePath />
      <ArtistIntro />
      <CatalogFloorMap />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
    </>
  )
}
