import { useEffect, useRef } from 'react';

const FeatureCards = () => {
  const globeDotsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (globeDotsRef.current) {
      const numDots = 400;
      
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'absolute w-0.5 h-0.5 bg-white rounded-full';
        dot.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.8)';
        
        let x, y;
        if (Math.random() > 0.4) {
          const clusterX = [30, 60, 80, 40, 70];
          const clusterY = [40, 30, 60, 70, 50];
          const cluster = Math.floor(Math.random() * clusterX.length);
          
          x = clusterX[cluster] + (Math.random() - 0.5) * 40;
          y = clusterY[cluster] + (Math.random() - 0.5) * 40;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const height = Math.random();
          const radius = 190 * Math.sqrt(1 - height * height);
          x = Math.cos(angle) * radius + 190;
          y = Math.sin(angle) * radius + 190;
        }
        
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        dot.style.opacity = String(Math.random() * 0.6 + 0.3);
        
        globeDotsRef.current.appendChild(dot);
      }
    }
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-10">
      <div className="max-w-[1100px] h-screen mx-auto flex flex-col lg:flex-row gap-5">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Global Collaboration Card - 70% */}
          <div className="relative overflow-hidden rounded-3xl p-10 border border-red-300 flex-[7]" 
               style={{
                 background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)'
               }}>
            {/* Card overlay glow */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{
                   background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)'
                 }} />
            
            {/* Orb glow */}
            <div className="absolute w-[60px] h-[60px] -top-10 -left-[60px] rounded-full opacity-60"
                 style={{
                   background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(100, 100, 100, 0.1))',
                   filter: 'blur(20px)'
                 }} />
            
            <h2 className="text-[28px] font-semibold text-white mb-4 leading-tight">
              Real-Time Global Collaboration
            </h2>
            <p className="text-[16px] text-[#9ca3af] leading-relaxed">
              Collaborate seamlessly with teams across the globe. Stay connected and work together in real time, no matter where you are, ensuring everyone is always on the same page.
            </p>
            
            {/* Globe Container */}
            <div className="relative w-full flex-1 flex items-center justify-center mt-10">
              {/* Globe glow */}
              <div className="absolute -top-[100px] -left-[100px] w-[580px] h-[580px] pointer-events-none"
                   style={{
                     background: 'radial-gradient(circle, rgba(100, 100, 100, 0.15) 0%, transparent 70%)',
                     filter: 'blur(40px)'
                   }} />
              
              {/* Globe */}
              <div className="relative w-[380px] h-[380px] rounded-full"
                   style={{
                     background: 'radial-gradient(circle at 30% 30%, #2a2a2a 0%, #0f0f0f 50%, #000000 100%)',
                     boxShadow: 'inset -20px -20px 60px rgba(0, 0, 0, 0.8), inset 10px 10px 40px rgba(255, 255, 255, 0.05), 0 0 80px rgba(0, 0, 0, 0.8)'
                   }}>
                <div ref={globeDotsRef} className="absolute inset-0 rounded-full overflow-hidden" />
              </div>
              
              {/* Globe ring */}
              <div className="absolute bottom-20 -left-[50px] w-[480px] h-[100px] border-2 border-white/10 rounded-full"
                   style={{
                     transform: 'rotateX(75deg)',
                     boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                   }} />
            </div>
          </div>

          {/* Integration Card - 30% */}
          <div className="relative overflow-hidden rounded-3xl p-6 border border-green-500 flex-[3]"
               style={{
                 background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)'
               }}>
            <div className="absolute inset-0 pointer-events-none"
                 style={{
                   background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)'
                 }} />
            
            {/* Orb glow */}
            <div className="absolute w-[100px] h-[100px] bottom-[60px] -right-10 rounded-full opacity-60"
                 style={{
                   background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(100, 100, 100, 0.1))',
                   filter: 'blur(20px)'
                 }} />
            
            <h2 className="text-[22px] font-semibold text-white mb-2 leading-tight">
              Seamless Integrations with Your Favorite Tools
            </h2>
            <p className="text-[14px] text-[#9ca3af] leading-relaxed mb-4">
              Connect Aligno with your favorite tools to streamline workflows and boost productivity.
            </p>
            
            {/* Integration visual */}
            <div className="flex items-center gap-4">
              {/* Calendar icon */}
              <div className="relative w-[100px] h-[100px] rounded-[20px] p-2"
                   style={{
                     background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)',
                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                   }}>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/90">
                  JAN
                </div>
                <div className="w-full h-[20px] rounded-t-lg mb-1"
                     style={{
                       background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)'
                     }} />
                <div className="flex items-center justify-center h-[calc(100%-28px)] text-3xl font-bold text-white">
                  31
                </div>
              </div>
              
              {/* Search icon */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                   style={{
                     background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)',
                     boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)'
                   }}>
                <div className="relative">
                  <div className="w-[28px] h-[28px] border-3 border-white/60 rounded-full" />
                  <div className="absolute w-[14px] h-0.5 bg-white/60 -bottom-1.5 -right-2 rounded-sm"
                       style={{ transform: 'rotate(45deg)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Analytics Card - 30% */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 border border-purple-900 flex-[3]"
               style={{
                 background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)'
               }}>
            <div className="absolute inset-0 pointer-events-none"
                 style={{
                   background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)'
                 }} />
            
            <div></div>

            <div className='flex justify-between items-end'>
                  {/* Analytics bars */}
            <div className="flex gap-3 items-end h-[100px]">
              <div className="w-[30px] h-[90px] bg-[#2a2a2a] rounded-[40px]"
                   style={{
                     boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.5)'
                   }} />
              <div className="w-[30px] h-[120px] rounded-[40px]"
                   style={{
                     background: 'linear-gradient(180deg, #ff8a6b 0%, #ff6b4a 100%)',
                     boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 107, 74, 0.4), 0 0 60px rgba(255, 107, 74, 0.2)'
                   }} />
              <div className="w-[30px] h-[70px] bg-[#2a2a2a] rounded-[40px]"
                   style={{
                     boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.5)'
                   }} />
            </div>

           <div className='w-[70%]'>
              <h2 className="text-[22px] font-semibold text-white mb-2 leading-tight">
                Advance Analytics
              </h2>
              <p className="text-[14px] text-[#9ca3af] leading-relaxed mb-4">
                Unlock valuable insights into project performance, helping you make data-driven decisions with ease.
              </p>
            </div>
            </div>
            
            
          </div>

          {/* Sprint Planning Card - 70% */}
          <div className="relative overflow-hidden rounded-3xl p-10 border border-blue-900 flex-[7]"
               style={{
                 background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)'
               }}>
            <div className="absolute inset-0 pointer-events-none"
                 style={{
                   background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)'
                 }} />
            
            <h2 className="text-[28px] font-semibold text-white mb-4 leading-tight">
              Sprint Planning Made Simple
            </h2>
            <p className="text-[16px] text-[#9ca3af] leading-relaxed mb-8">
              Organize and execute your work in short, focused sprints. Track progress, set goals, and deliver.
            </p>
            
            {/* Sprint visual */}
            <div className="flex gap-5 items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-[#2a2a2a] border-2 border-white/10 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face" 
                     alt="User 1" 
                     className="w-full h-full object-cover" />
              </div>
              <div className="w-[50px] h-[50px] rounded-full bg-[#2a2a2a] border-2 border-white/10 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" 
                     alt="User 2" 
                     className="w-full h-full object-cover" />
              </div>
              
              {/* Lightning */}
              <div className="relative w-[200px] h-[200px] ml-auto">
                <div className="absolute -top-[50px] -left-[50px] w-[300px] h-[300px] pointer-events-none"
                     style={{
                       background: 'radial-gradient(circle, rgba(255, 107, 74, 0.3) 0%, transparent 70%)',
                       filter: 'blur(50px)'
                     }} />
                <div className="w-full h-full"
                     style={{
                       background: 'linear-gradient(135deg, #ffb8a0 0%, #ff8a6b 50%, #ff6b4a 100%)',
                       clipPath: 'polygon(50% 0%, 65% 35%, 100% 35%, 55% 100%, 60% 60%, 25% 60%)',
                       filter: 'blur(1px)',
                       boxShadow: '0 0 40px rgba(255, 107, 74, 0.6), 0 0 80px rgba(255, 107, 74, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                     }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeatureCards;

// import { useEffect, useRef } from 'react';

// const FeatureCards = () => {
//   const globeDotsRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (globeDotsRef.current) {
//       const numDots = 400;
      
//       for (let i = 0; i < numDots; i++) {
//         const dot = document.createElement('div');
//         dot.className = 'absolute w-0.5 h-0.5 bg-white rounded-full';
//         dot.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.8)';
        
//         let x, y;
//         if (Math.random() > 0.4) {
//           const clusterX = [30, 60, 80, 40, 70];
//           const clusterY = [40, 30, 60, 70, 50];
//           const cluster = Math.floor(Math.random() * clusterX.length);
          
//           x = clusterX[cluster] + (Math.random() - 0.5) * 40;
//           y = clusterY[cluster] + (Math.random() - 0.5) * 40;
//         } else {
//           const angle = Math.random() * Math.PI * 2;
//           const height = Math.random();
//           const radius = 190 * Math.sqrt(1 - height * height);
//           x = Math.cos(angle) * radius + 190;
//           y = Math.sin(angle) * radius + 190;
//         }
        
//         dot.style.left = x + 'px';
//         dot.style.top = y + 'px';
//         dot.style.opacity = String(Math.random() * 0.6 + 0.3);
        
//         globeDotsRef.current.appendChild(dot);
//       }
//     }
//   }, []);

//   return (
//     <div className="bg-[#0a0a0a] min-h-screen p-10">
//       <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5" style={{ gridAutoRows: '1fr' }}>
        
//         {/* Global Collaboration Card */}
//         <div className="relative overflow-hidden rounded-3xl p-10 lg:row-span-2 border border-red-300 " 
//              style={{
//                background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)'
//              }}>
//           {/* Card overlay glow */}
//           <div className="absolute inset-0 pointer-events-none"
//                style={{
//                  background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)'
//                }} />
          
//           {/* Orb glow */}
//           <div className="absolute w-[60px] h-[60px] -top-10 -left-[60px] rounded-full opacity-60"
//                style={{
//                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(100, 100, 100, 0.1))',
//                  filter: 'blur(20px)'
//                }} />
          
//           <h2 className="text-[28px] font-semibold text-white mb-4 leading-tight">
//             Real-Time Global Collaboration
//           </h2>
//           <p className="text-[16px] text-[#9ca3af] leading-relaxed">
//             Collaborate seamlessly with teams across the globe. Stay connected and work together in real time, no matter where you are, ensuring everyone is always on the same page.
//           </p>
          
//           {/* Globe Container */}
//           <div className="relative w-full flex-1 flex items-center justify-center mt-10">
//             {/* Globe glow */}
//             <div className="absolute -top-[100px] -left-[100px] w-[580px] h-[580px] pointer-events-none"
//                  style={{
//                    background: 'radial-gradient(circle, rgba(100, 100, 100, 0.15) 0%, transparent 70%)',
//                    filter: 'blur(40px)'
//                  }} />
            
//             {/* Globe */}
//             <div className="relative w-[380px] h-[380px] rounded-full"
//                  style={{
//                    background: 'radial-gradient(circle at 30% 30%, #2a2a2a 0%, #0f0f0f 50%, #000000 100%)',
//                    boxShadow: 'inset -20px -20px 60px rgba(0, 0, 0, 0.8), inset 10px 10px 40px rgba(255, 255, 255, 0.05), 0 0 80px rgba(0, 0, 0, 0.8)'
//                  }}>
//               <div ref={globeDotsRef} className="absolute inset-0 rounded-full overflow-hidden" />
//             </div>
            
//             {/* Globe ring */}
//             <div className="absolute bottom-20 -left-[50px] w-[480px] h-[100px] border-2 border-white/10 rounded-full"
//                  style={{
//                    transform: 'rotateX(75deg)',
//                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
//                  }} />
//           </div>
//         </div>

//         {/* Analytics Card */}
//         <div className="relative overflow-hidden rounded-3xl p-10 border border-purple-900"
//              style={{
//                background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)'
//              }}>
//           <div className="absolute inset-0 pointer-events-none"
//                style={{
//                  background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)'
//                }} />
          
//           <h2 className="text-[28px] font-semibold text-white mb-4 leading-tight">
//             Advance Analytics
//           </h2>
//           <p className="text-[16px] text-[#9ca3af] leading-relaxed mb-8">
//             Unlock valuable insights into project performance, helping you make data-driven decisions with ease.
//           </p>
          
//           {/* Analytics bars */}
//           <div className="flex gap-4 items-end h-[140px]">
//             <div className="w-[60px] h-[80px] bg-[#2a2a2a] rounded-[40px]"
//                  style={{
//                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.5)'
//                  }} />
//             <div className="w-[60px] h-[120px] rounded-[40px]"
//                  style={{
//                    background: 'linear-gradient(180deg, #ff8a6b 0%, #ff6b4a 100%)',
//                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 107, 74, 0.4), 0 0 60px rgba(255, 107, 74, 0.2)'
//                  }} />
//             <div className="w-[60px] h-[60px] bg-[#2a2a2a] rounded-[40px]"
//                  style={{
//                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.5)'
//                  }} />
//           </div>
//         </div>

//         {/* Sprint Planning Card */}
//         <div className="relative overflow-hidden rounded-3xl p-10 border border-blue-900"
//              style={{
//                background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)'
//              }}>
//           <div className="absolute inset-0 pointer-events-none"
//                style={{
//                  background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)'
//                }} />
          
//           <h2 className="text-[28px] font-semibold text-white mb-4 leading-tight">
//             Sprint Planning Made Simple
//           </h2>
//           <p className="text-[16px] text-[#9ca3af] leading-relaxed mb-8">
//             Organize and execute your work in short, focused sprints. Track progress, set goals, and deliver.
//           </p>
          
//           {/* Sprint visual */}
//           <div className="flex gap-5 items-center">
//             <div className="w-[50px] h-[50px] rounded-full bg-[#2a2a2a] border-2 border-white/10 overflow-hidden">
//               <img src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face" 
//                    alt="User 1" 
//                    className="w-full h-full object-cover" />
//             </div>
//             <div className="w-[50px] h-[50px] rounded-full bg-[#2a2a2a] border-2 border-white/10 overflow-hidden">
//               <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" 
//                    alt="User 2" 
//                    className="w-full h-full object-cover" />
//             </div>
            
//             {/* Lightning */}
//             <div className="relative w-[200px] h-[200px] ml-auto">
//               <div className="absolute -top-[50px] -left-[50px] w-[300px] h-[300px] pointer-events-none"
//                    style={{
//                      background: 'radial-gradient(circle, rgba(255, 107, 74, 0.3) 0%, transparent 70%)',
//                      filter: 'blur(50px)'
//                    }} />
//               <div className="w-full h-full"
//                    style={{
//                      background: 'linear-gradient(135deg, #ffb8a0 0%, #ff8a6b 50%, #ff6b4a 100%)',
//                      clipPath: 'polygon(50% 0%, 65% 35%, 100% 35%, 55% 100%, 60% 60%, 25% 60%)',
//                      filter: 'blur(1px)',
//                      boxShadow: '0 0 40px rgba(255, 107, 74, 0.6), 0 0 80px rgba(255, 107, 74, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)'
//                    }} />
//             </div>
//           </div>
//         </div>

//         {/* Integration Card */}
//         <div className="relative overflow-hidden rounded-3xl p-10 border border-green-500"
//              style={{
//                background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)'
//              }}>
//           <div className="absolute inset-0 pointer-events-none"
//                style={{
//                  background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)'
//                }} />
          
//           {/* Orb glow */}
//           <div className="absolute w-[100px] h-[100px] bottom-[60px] -right-10 rounded-full opacity-60"
//                style={{
//                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(100, 100, 100, 0.1))',
//                  filter: 'blur(20px)'
//                }} />
          
//           <h2 className="text-[28px] font-semibold text-white mb-4 leading-tight">
//             Seamless Integrations with Your Favorite Tools
//           </h2>
//           <p className="text-[16px] text-[#9ca3af] leading-relaxed mb-8">
//             Connect Aligno with your favorite tools to streamline workflows and boost Cproductivity.
//           </p>
          
//           {/* Integration visual */}
//           <div className="flex items-center gap-8">
//             {/* Calendar icon */}
//             <div className="relative w-[140px] h-[140px] rounded-[28px] p-3"
//                  style={{
//                    background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)',
//                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
//                  }}>
//               <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/90">
//                 JAN
//               </div>
//               <div className="w-full h-[30px] rounded-t-lg mb-2"
//                    style={{
//                      background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)'
//                    }} />
//               <div className="flex items-center justify-center h-[calc(100%-38px)] text-5xl font-bold text-white">
//                 31
//               </div>
//             </div>
            
//             {/* Search icon */}
//             <div className="w-20 h-20 rounded-full flex items-center justify-center"
//                  style={{
//                    background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)',
//                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)'
//                  }}>
//               <div className="relative">
//                 <div className="w-[35px] h-[35px] border-4 border-white/60 rounded-full" />
//                 <div className="absolute w-[18px] h-1 bg-white/60 -bottom-2 -right-2.5 rounded-sm"
//                      style={{ transform: 'rotate(45deg)' }} />
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default FeatureCards;