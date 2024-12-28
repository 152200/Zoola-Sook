


export default function DepartmentsSlider(){
    function makeCategoryCard(source, name) {
        return (
            <div className='cursor-pointer bg-color flex-col justify-center'>
                <img className=' h-[170px] w-[170px] rounded-full' src={source} alt={name} />
                <span className='t4s-text' style={{display:"block",textAlign:"center"}}>{name}
                </span>
            </div>
        );
    }
    return (
        <div className="h-[212.39] flex items-center justify-center gap-[30px] mb-[50px] bg-[#E9E9E9]">
            {makeCategoryCard("https://lady90s.com/cdn/shop/collections/image_d23a792e-f5ec-4458-bec0-cdd52f56b0ce.jpg?v=1697490934&width=100","اكسسوارات")}
            {makeCategoryCard("https://lady90s.com/cdn/shop/collections/image_8c755ad4-5086-4b2b-8246-d86fb8c18f85.jpg?v=1697486509&width=200","ساعات")}
            {makeCategoryCard("https://lady90s.com/cdn/shop/collections/image_fef03785-0386-4dd9-ae4e-1cdcd237cfbe.jpg?v=1697478270&width=200","شنط للمناسبات")}
        </div>
    );
}