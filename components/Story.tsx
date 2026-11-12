"use client";
import Hero from "./Hero";
import Song from "./Song";
import Gallery from "./Gallery";
import Letter from "./Letter";
import Timeline from "./Timeline";
import Voice from "./Voice";
import Reasons from "./Reasons";
import PlacesMap from "./PlacesMap";
import Outro from "./Outro";
import Surprise from "./Surprise";

export default function Story() {
  return (
    <div className="pt-0">
      <Hero /><Song /><Gallery /><Letter /><Timeline /><Voice /><Reasons /><PlacesMap /><Outro /><Surprise />
    </div>
  );
}
