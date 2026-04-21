import { Badge } from "@/components/ui/badge";
import { ProfileGallery } from "./profile-gallery";
import { Calendar, Edit, Mars, Palette, Ruler, Share, Trash2, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroDetails() {

    return (
        <section className="mb-12">
            <div className="bg-card rounded-3xl p-8 flex flex-col lg:flex-row gap-20 items-center lg:items-start shadow-sm border border-slate-200 relative overflow-hidden">

                <ProfileGallery />

                {/* Colonna Centrale */}
                <div className="flex-1 flex flex-col justify-between self-stretch space-y-6 text-center md:text-left z-10 pt-4 w-full">


                    <div className="space-y-2">
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 pr-28"> {/* pr-28 per non sovrapporsi ai tasti */}
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/60 font-bold uppercase tracking-wider px-3">
                                JKC REG #10294-AK
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground leading-tight">
                            A Kouka Ho Of Lovemute Kenner
                        </h1>
                    </div>

                    {/* Breeding Records */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 border-y border-slate-200">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 mb-0.5 uppercase tracking-wider">Breeder</p>
                            <p className="font-bold text-foreground text-sm">Takeshi Yamashita</p>
                            <p className="text-xs text-slate-500">Kobe, Japan</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 mb-0.5 uppercase tracking-wider">Kennel</p>
                            <p className="font-bold text-primary text-sm">Mountain View Akitas</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 mb-0.5 uppercase tracking-wider">Current Owner</p>
                            <p className="font-bold text-foreground text-sm">Estate of M. Tanaka</p>
                        </div>
                    </div>


                    {/* Genitori (Ora occupano tutto lo spazio inferiore fino ai margini) */}
                    <div className="space-y-4 pt-2">
                        <h3 className="text-xs font-bold text-accent-foreground uppercase tracking-widest">Direct Lineage</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto md:mx-0">
                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-accent/50 border border-accent hover:bg-accent transition-all cursor-pointer group">
                                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                                    <Image src="https://images.unsplash.com/photo-1670269828655-689caf8aa01a?q=80&w=687&auto=format&fit=crop" width={64} height={64} alt="Sire" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sire</p>
                                    <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">Kuma No Ryu</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-accent/50 border border-accent hover:bg-accent transition-all cursor-pointer group">
                                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                                    <Image src="https://images.unsplash.com/photo-1596797882870-8c33deeac224?q=80&w=200&auto=format&fit=crop" width={64} height={64} alt="Dam" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dam</p>
                                    <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">Hime No Sakura</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLONNA DESTRA: Technical Profile & Geography */}
                <div className="w-full lg:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-4 lg:pl-8 flex flex-col gap-10 text-left z-10">

                    {/* Technical Profile */}
                    <div>
                        <h3 className="text-xs font-bold text-accent-foreground uppercase tracking-widest mb-5">Technical Profile</h3>
                        <div className="space-y-5">
                            {/* Sex e Color */}
                            <div className="flex flex-row gap-6">
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sex</p>
                                    <div className="flex items-center gap-2">
                                        <Mars className="w-4 h-4 text-slate-400" />
                                        <span className="font-bold text-sm text-foreground">Male</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Color</p>
                                    <div className="flex items-center gap-2">
                                        <Palette className="w-4 h-4 text-slate-400" />
                                        <span className="font-bold text-sm text-foreground">Red</span>
                                    </div>
                                </div>
                            </div>

                            {/* Height e Weight */}
                            <div className="flex flex-row gap-6">
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Height</p>
                                    <div className="flex items-center gap-2">
                                        <Ruler className="w-4 h-4 text-slate-400" />
                                        <span className="font-bold text-sm text-foreground">66 cm</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Weight</p>
                                    <div className="flex items-center gap-2">
                                        <Weight className="w-4 h-4 text-slate-400" />
                                        <span className="font-bold text-sm text-foreground">42 kg</span>
                                    </div>
                                </div>
                            </div>

                            {/* Call Name */}
                            <div className="pt-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Call Name</p>
                                <p className="font-bold text-sm text-foreground tracking-wide">Mishi</p>
                            </div>

                            {/* Date of Birth e Date of Death affiancati (SENZA BORDINO) */}
                            <div className="flex flex-row gap-6 pt-1">
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Date of Birth</p>
                                    <div className="flex items-center gap-2 text-foreground">
                                        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                        <span className="font-bold text-[13px] leading-tight">12 June 2014</span>
                                    </div>
                                </div>
                                <div className="flex-1 pl-4"> {/* Rimosso border-l border-slate-100 */}
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Date of Death</p>
                                    <div className="flex items-center gap-2 text-foreground">
                                        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                        <span className="font-bold text-[13px] leading-tight">24 Nov 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Geography affiancata (SENZA BORDINO) */}
                    <div>
                        <h3 className="text-xs font-bold text-accent-foreground uppercase tracking-widest mb-5">Geography</h3>
                        <div className="flex flex-row gap-6">
                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Land of Birth</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-base">🇯🇵</span>
                                    <span className="font-bold text-sm text-foreground">Japan</span>
                                </div>
                            </div>
                            <div className="flex-1 pl-4"> {/* Rimosso border-l border-slate-100 */}
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Land of Standing</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-base">🇮🇹</span>
                                    <span className="font-bold text-sm text-foreground">Italy</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        {/* --- BOTTONE EDIT --- */}
                        <Button
                            size="sm"
                            className="group relative flex items-center bg-blue-400 px-3 text-primary-foreground hover:brightness-110 hover:px-4 text-xs rounded-full font-bold active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            <Edit className="w-4 h-4" />
                            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-12.5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-out whitespace-nowrap">
                                Edit
                            </span>
                        </Button>

                        {/* --- BOTTONE SHARE --- */}
                        <Button
                            size="sm"
                            className="group relative flex items-center bg-slate-100 px-3  text-foreground hover:brightness-105 hover:px-4 text-xs rounded-full font-semibold active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            <Share className="w-4 h-4" />
                            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-12.5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-out whitespace-nowrap">
                                Share
                            </span>
                        </Button>

                        {/* --- BOTTONE DELETE --- */}
                        <Button
                            size="sm"
                            className="group relative flex items-center bg-red-400 px-3 text-primary-foreground hover:brightness-110 hover:px-4 text-xs rounded-full font-bold active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-15 group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-out whitespace-nowrap">
                                Delete
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}