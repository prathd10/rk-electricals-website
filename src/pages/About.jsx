import { ShieldCheck, Award, History, Users, MapPin } from 'lucide-react'
import { useReveal } from '../hooks/useInView'

export default function About() {
  const ref = useReveal()

  return (
    <div className="pt-32 bg-tan-50 min-h-screen" ref={ref}>
      {/* Hero Section */}
      <section className="py-20 pad">
        <div className="max-w-site mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] reveal d-0">Our Legacy</span>
            <h1 className="h1 mt-8 text-forest-800 reveal d-100">
              Three Decades of <br />
              <span className="italic font-normal text-forest-600">Electrical Excellence.</span>
            </h1>
            <p className="text-lg text-forest-800/60 mt-12 leading-relaxed reveal d-200">
              Founded in 1994, RK Electricals began as a small boutique shop in Borivali West. Today, we are one of Mumbai's most trusted PWD-licensed contractors, blending technical mastery with a commitment to safety.
            </p>
          </div>
          <div className="reveal d-200">
            <div className="aspect-video bg-forest-800 rounded-3xl overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" 
                alt="Electrical Engineering Workspace" 
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-white">
        <div className="max-w-site pad mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1 reveal d-0">
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-tan-100 p-8 rounded-2xl">
                  <History className="text-forest-600 mb-6" size={32} />
                  <h4 className="font-serif text-xl text-forest-800 mb-2">1994</h4>
                  <p className="text-forest-800/60 text-xs">Started as a retail shop at Surya Kiran, Borivali.</p>
                </div>
                <div className="bg-forest-50 p-8 rounded-2xl mt-12">
                  <ShieldCheck className="text-forest-600 mb-6" size={32} />
                  <h4 className="font-serif text-xl text-forest-800 mb-2">PWD Licensed</h4>
                  <p className="text-forest-800/60 text-xs">Became a registered government contractor for major projects.</p>
                </div>
                <div className="bg-forest-50 p-8 rounded-2xl -mt-12">
                  <Award className="text-forest-600 mb-6" size={32} />
                  <h4 className="font-serif text-xl text-forest-800 mb-2">30+ Years</h4>
                  <p className="text-forest-800/60 text-xs">Uninterrupted service to the Borivali community.</p>
                </div>
                <div className="bg-tan-100 p-8 rounded-2xl">
                  <Users className="text-forest-600 mb-6" size={32} />
                  <h4 className="font-serif text-xl text-forest-800 mb-2">5000+</h4>
                  <p className="text-forest-800/60 text-xs">Projects completed across residential & commercial sectors.</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 reveal d-200">
              <h2 className="h2 text-forest-800 mb-10">Technical Mastery <br /><span className="italic font-normal text-forest-600">meets Local Trust.</span></h2>
              <div className="space-y-8 text-forest-800/70 leading-relaxed">
                <p>
                  At RK Electricals, we believe that electrical work is the invisible backbone of any great space. Whether it's the complex wiring of a luxury high-rise or the delicate lighting of a designer home, our approach remains the same: precision, safety, and durability.
                </p>
                <p>
                  Our founder started with a simple vision: to provide Borivali with a one-stop destination for both premium electrical hardware and master-level execution. Today, we continue that tradition, partnering with leading developers and designers to power the future of Mumbai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-forest-800 text-white overflow-hidden relative">
        <div className="max-w-site pad mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="h2 mb-12">Our Core <span className="italic font-normal opacity-60">Philosophy.</span></h2>
            <div className="grid md:grid-cols-3 gap-16 text-center">
              <div>
                <h4 className="text-pastelBrown-500 font-serif text-3xl mb-4">Safety</h4>
                <p className="text-white/40 text-sm">Rigorous adherence to ISI and global safety standards in every wire we lay.</p>
              </div>
              <div>
                <h4 className="text-pastelBrown-500 font-serif text-3xl mb-4">Quality</h4>
                <p className="text-white/40 text-sm">Using only premium components from brands like Polycab, Havells, and Schneider.</p>
              </div>
              <div>
                <h4 className="text-pastelBrown-500 font-serif text-3xl mb-4">Legacy</h4>
                <p className="text-white/40 text-sm">Building relationships that last as long as our electrical systems.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-forest-900/20 pointer-events-none" />
      </section>

      {/* Visit Us */}
      <section className="py-32 bg-white">
        <div className="max-w-site pad mx-auto">
          <div className="bg-tan-100 p-12 lg:p-20 flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <MapPin className="text-forest-600 mb-8" size={40} />
              <h2 className="h2 text-forest-800 mb-8">Visit our legacy <br /><span className="italic font-normal text-forest-600">showroom.</span></h2>
              <p className="text-forest-800/60 mb-12 max-w-md">
                Experience our range of premium switches, lighting solutions, and smart home hardware at our landmark Borivali West location.
              </p>
              <a 
                href="https://www.google.com/maps/search/Surya+Kiran+Baburao+Paranjape+Marg+Borivali+West+Mumbai+400092" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-underline"
              >
                Get Directions to Surya Kiran
              </a>
            </div>
            <div className="flex-1 w-full aspect-square lg:aspect-video bg-forest-800 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80" 
                alt="Electrical Showroom" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
