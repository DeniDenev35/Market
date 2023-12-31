/**
 * star module
 */

((Themify,doc)=>{
    'use strict';
    const observer=new IntersectionObserver((entries, _self)=> {
        for (let i=entries.length-1; i>-1;--i) {
            if (entries[i].isIntersecting===true) {
                let target=entries[i].target;
                _self.unobserve(target);
                let stars=target.tfClass('tf_fa');
                requestAnimationFrame(()=>{
                    for(let j=stars.length-1;j>-1;--j){
                        stars[j].style.transitionDelay=((j+1)*40)+'ms';
                    }
                    target.classList.add('tb_star_animate');
                });
            }
        }
    },{thresholds:1});
    Themify.on('builder_load_module_partial', (el,isLazy)=>{
        if(isLazy===true && !el.classList.contains('module-star')){
            return;
        }
        const d=el || doc,
        items = d.tfClass('tb_star_item');
        for(let i=items.length-1;i>-1;--i){
            observer.observe(items[i]);
        }
    });
})(Themify,document);
