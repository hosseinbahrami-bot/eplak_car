import math
import wave
import struct
import random

SAMPLE_RATE = 22050

def write_wav(filename, samples, sample_rate=SAMPLE_RATE):
    # Normalize to prevent clipping, peak at 0.95
    max_amp = max(abs(s) for s in samples) if samples else 1.0
    if max_amp < 1e-5:
        max_amp = 1.0
    norm_factor = 0.95 / max_amp

    with wave.open(filename, 'w') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        frames = bytearray()
        for s in samples:
            val = int(max(-32767, min(32767, s * norm_factor * 32767)))
            frames.extend(struct.pack('<h', val))
        wav.writeframes(frames)
    print(f"Generated {filename} ({len(samples)/sample_rate:.2f}s)")

def make_car_starter():
    """Porsche 911 GT3 RS Flat-6 starter sound (2.4s)"""
    duration = 2.4
    total_samples = int(duration * SAMPLE_RATE)
    samples = [0.0] * total_samples
    rnd = random.Random(42)

    # 0.0 - 0.1s: Relay click + solenoid snap
    # 0.1 - 0.95s: Starter motor spin + 4 compression chugs
    # 0.95 - 1.5s: Ignition burst + 2400 RPM throttle blip
    # 1.5 - 2.4s: Settle down to 800 RPM idle

    phase_starter = 0.0
    phase_engine = 0.0
    crank_phase = 0.0

    for i in range(total_samples):
        t = i / SAMPLE_RATE

        if t < 0.1:
            # Solenoid click
            click = math.exp(-t * 80) * math.sin(2 * math.pi * 1200 * t) * 0.4
            gear = (rnd.random() * 2 - 1) * math.exp(-t * 40) * 0.2
            samples[i] = click + gear
        elif t < 0.95:
            # Cranking phase
            crank_t = t - 0.1
            # Starter motor whine ramping to ~360 Hz
            starter_freq = 280 + 80 * (crank_t / 0.85)
            phase_starter += 2 * math.pi * starter_freq / SAMPLE_RATE
            starter_whine = 0.35 * (math.sin(phase_starter) + 0.3 * math.sin(phase_starter * 2) + 0.15 * math.sin(phase_starter * 3))

            # Compression chugs (approx 9 Hz = 540 RPM cranking)
            chug_freq = 8.5
            crank_phase += 2 * math.pi * chug_freq / SAMPLE_RATE
            compression = math.sin(crank_phase)
            pulse = math.pow(max(0, compression), 3.5) * 0.7

            # Mechanical brush hiss & gear rattle
            rattle = (rnd.random() * 2 - 1) * 0.18 * (0.5 + 0.5 * pulse)

            samples[i] = starter_whine + pulse + rattle
        elif t < 1.5:
            # Catch and rev blip (RPM surges from 540 to 2400 then falls)
            catch_t = t - 0.95
            if catch_t < 0.08:
                # Sudden ignition explosion transient
                pop = (rnd.random() * 2 - 1) * math.exp(-catch_t * 60) * 0.9
            else:
                pop = 0.0

            # Blip curve: peaks at catch_t = 0.2, then decays
            rpm_curve = math.exp(-((catch_t - 0.2)**2) / 0.08)
            rpm = 1000 + 1400 * rpm_curve
            # Flat 6 fundamental: 3 pulses per rev -> (rpm/60)*3
            f0 = (rpm / 60.0) * 3.0
            phase_engine += 2 * math.pi * f0 / SAMPLE_RATE

            # Rich Porsche Flat-6 harmonics
            h1 = math.sin(phase_engine)
            h2 = 0.7 * math.sin(2 * phase_engine)
            h3 = 0.5 * math.sin(3 * phase_engine)
            h4 = 0.35 * math.sin(4 * phase_engine)
            h6 = 0.2 * math.sin(6 * phase_engine)
            exhaust_growl = (h1 + h2 + h3 + h4 + h6) * 0.65

            # Exhaust flow rumble
            flow = (rnd.random() * 2 - 1) * 0.2 * (rpm / 2000.0)

            samples[i] = pop + exhaust_growl + flow
        else:
            # Settle into idle (800 RPM)
            idle_t = t - 1.5
            # RPM glides smoothly from 1100 to 800
            decay = math.exp(-idle_t * 2.5)
            rpm = 800 + 300 * decay
            f0 = (rpm / 60.0) * 3.0
            phase_engine += 2 * math.pi * f0 / SAMPLE_RATE

            h1 = math.sin(phase_engine)
            h2 = 0.65 * math.sin(2 * phase_engine)
            h3 = 0.45 * math.sin(3 * phase_engine)
            h4 = 0.3 * math.sin(4 * phase_engine)
            combustion = (h1 + h2 + h3 + h4) * 0.6
            sub = 0.4 * math.sin(phase_engine * 0.5)
            rumble = (rnd.random() * 2 - 1) * 0.12

            samples[i] = combustion + sub + rumble

    return samples

def make_motor_starter():
    """Honda CB1300 Super Four starter sound (2.1s)"""
    duration = 2.1
    total_samples = int(duration * SAMPLE_RATE)
    samples = [0.0] * total_samples
    rnd = random.Random(1300)

    # 0.0 - 0.08s: Starter switch contact & relay
    # 0.08 - 0.65s: High-speed starter churn (14 Hz pulses, 620 Hz starter whine)
    # 0.65 - 1.2s: Instant 4-cylinder fire & blip to 3200 RPM
    # 1.2 - 2.1s: Settle to 1000 RPM idle

    phase_starter = 0.0
    phase_engine = 0.0
    crank_phase = 0.0

    for i in range(total_samples):
        t = i / SAMPLE_RATE

        if t < 0.08:
            click = math.exp(-t * 90) * math.sin(2 * math.pi * 1800 * t) * 0.35
            samples[i] = click
        elif t < 0.65:
            crank_t = t - 0.08
            starter_freq = 580 + 80 * (crank_t / 0.57)
            phase_starter += 2 * math.pi * starter_freq / SAMPLE_RATE
            starter_whine = 0.3 * (math.sin(phase_starter) + 0.25 * math.sin(phase_starter * 2))

            # Inline-4 compression pulses (13 Hz)
            crank_phase += 2 * math.pi * 13.0 / SAMPLE_RATE
            pulse = math.pow(max(0, math.sin(crank_phase)), 4.0) * 0.6
            rattle = (rnd.random() * 2 - 1) * 0.15 * (0.6 + 0.4 * pulse)

            samples[i] = starter_whine + pulse + rattle
        elif t < 1.2:
            catch_t = t - 0.65
            if catch_t < 0.06:
                snap = (rnd.random() * 2 - 1) * math.exp(-catch_t * 80) * 0.8
            else:
                snap = 0.0

            # Blip to 3200 RPM
            blip_peak = math.exp(-((catch_t - 0.18)**2) / 0.06)
            rpm = 1200 + 2000 * blip_peak
            # Inline-4 firing frequency: 2 per rev -> (rpm/60)*2
            f0 = (rpm / 60.0) * 2.0
            phase_engine += 2 * math.pi * f0 / SAMPLE_RATE

            # Smooth Japanese inline-4 timbre
            h1 = math.sin(phase_engine)
            h2 = 0.85 * math.sin(2 * phase_engine)
            h3 = 0.6 * math.sin(3 * phase_engine)
            h4 = 0.45 * math.sin(4 * phase_engine)
            h5 = 0.3 * math.sin(5 * phase_engine)
            pipe_resonance = (h1 + h2 + h3 + h4 + h5) * 0.55
            whir = 0.15 * math.sin(phase_engine * 8.0) # Cam chain whir

            samples[i] = snap + pipe_resonance + whir
        else:
            idle_t = t - 1.2
            decay = math.exp(-idle_t * 2.8)
            rpm = 1000 + 400 * decay
            f0 = (rpm / 60.0) * 2.0
            phase_engine += 2 * math.pi * f0 / SAMPLE_RATE

            h1 = math.sin(phase_engine)
            h2 = 0.8 * math.sin(2 * phase_engine)
            h3 = 0.5 * math.sin(3 * phase_engine)
            h4 = 0.35 * math.sin(4 * phase_engine)
            tone = (h1 + h2 + h3 + h4) * 0.55
            sub = 0.35 * math.sin(phase_engine * 0.5)
            hum = (rnd.random() * 2 - 1) * 0.08

            samples[i] = tone + sub + hum

    return samples

def make_truck_starter():
    """Scania V8 770S 16.4L Heavy Diesel starter (3.0s)"""
    duration = 3.0
    total_samples = int(duration * SAMPLE_RATE)
    samples = [0.0] * total_samples
    rnd = random.Random(770)

    # 0.0 - 0.25s: 24V Solenoid heavy CLANK
    # 0.25 - 1.5s: 4 heavy compression chugs (4 Hz, 240 RPM)
    # 1.5 - 2.2s: Diesel fire & 1100 RPM rev
    # 2.2 - 3.0s: Settle to 600 RPM idle + air brake hiss at 2.6s

    phase_starter = 0.0
    phase_engine = 0.0
    crank_phase = 0.0

    for i in range(total_samples):
        t = i / SAMPLE_RATE

        if t < 0.25:
            # Massive iron solenoid clank
            clank = math.exp(-t * 35) * (0.6 * math.sin(2 * math.pi * 320 * t) + 0.4 * (rnd.random()*2-1))
            samples[i] = clank
        elif t < 1.5:
            crank_t = t - 0.25
            # Heavy starter motor gear whine
            starter_freq = 160 + 40 * (crank_t / 1.25)
            phase_starter += 2 * math.pi * starter_freq / SAMPLE_RATE
            starter_whine = 0.32 * math.sin(phase_starter) + 0.15 * math.sin(phase_starter * 3)

            # Heavy V8 diesel compression strokes (4.2 Hz)
            crank_phase += 2 * math.pi * 4.2 / SAMPLE_RATE
            pulse = math.pow(max(0, math.sin(crank_phase)), 2.8) * 0.8
            # Low sub thud
            sub_thud = pulse * 0.6 * math.sin(2 * math.pi * 48 * crank_t)
            iron_shake = (rnd.random() * 2 - 1) * 0.18 * pulse

            samples[i] = starter_whine + pulse + sub_thud + iron_shake
        elif t < 2.2:
            catch_t = t - 1.5
            # Diesel clatter / ignition crack
            if catch_t < 0.12:
                knock = (rnd.random() * 2 - 1) * math.exp(-catch_t * 40) * 0.95
            else:
                knock = 0.0

            blip = math.exp(-((catch_t - 0.22)**2) / 0.08)
            rpm = 700 + 550 * blip
            # V8 4-stroke has 4 pulses per rev -> (rpm/60)*4
            f0 = (rpm / 60.0) * 4.0
            phase_engine += 2 * math.pi * f0 / SAMPLE_RATE

            h1 = math.sin(phase_engine)
            h2 = 0.9 * math.sin(2 * phase_engine)
            h3 = 0.7 * math.sin(3 * phase_engine)
            v8_rumble = (h1 + h2 + h3) * 0.6
            sub = 0.5 * math.sin(phase_engine * 0.5)

            # Turbo spool starting
            turbo_freq = 900 + 600 * blip
            turbo = 0.12 * math.sin(2 * math.pi * turbo_freq * catch_t)

            samples[i] = knock + v8_rumble + sub + turbo
        else:
            idle_t = t - 2.2
            rpm = 600
            f0 = (rpm / 60.0) * 4.0
            phase_engine += 2 * math.pi * f0 / SAMPLE_RATE

            h1 = math.sin(phase_engine)
            h2 = 0.85 * math.sin(2 * phase_engine)
            h3 = 0.65 * math.sin(3 * phase_engine)
            diesel_chug = (h1 + h2 + h3) * 0.55
            sub = 0.6 * math.sin(phase_engine * 0.5)

            # Air purge at t = 2.6s - 2.85s
            if 2.55 <= t <= 2.85:
                air_t = t - 2.55
                air_hiss = (rnd.random() * 2 - 1) * math.exp(-air_t * 9) * 0.45
            else:
                air_hiss = 0.0

            samples[i] = diesel_chug + sub + air_hiss

    return samples

def make_cb1300_idle():
    """Honda CB1300 Super Four 1284cc Inline-4 smooth idle loop (3.2s)"""
    duration = 3.2
    total_samples = int(duration * SAMPLE_RATE)
    samples = [0.0] * total_samples
    rnd = random.Random(1301)

    # 1000 RPM -> f0 = (1000/60)*2 = 33.333 Hz
    # 33.333333 Hz * 3.2s = 106.666 cycles.
    # To loop seamlessly, ensure exact integer number of cycles:
    # 107 cycles in duration => f0 = 107 / 3.2 = 33.4375 Hz (1003.1 RPM)
    f0 = 107.0 / duration
    phase = 0.0

    for i in range(total_samples):
        phase = 2 * math.pi * f0 * (i / SAMPLE_RATE)

        # Silky smooth inline 4 harmonics
        h1 = 0.45 * math.sin(phase)
        h2 = 0.55 * math.sin(2 * phase + 0.2)
        h3 = 0.38 * math.sin(3 * phase + 0.5)
        h4 = 0.28 * math.sin(4 * phase + 0.8)
        h5 = 0.18 * math.sin(5 * phase)
        h6 = 0.12 * math.sin(6 * phase)

        # Deep 4-into-1 muffler acoustic body
        sub = 0.42 * math.sin(0.5 * phase)

        # Subtle intake flutter & mechanical valve gear hum
        flutter = (rnd.random() * 2 - 1) * 0.05

        samples[i] = h1 + h2 + h3 + h4 + h5 + h6 + sub + flutter

    return samples

def make_cb1300_rev():
    """Honda CB1300 Super Four Inline-4 rev from 1000 to 8500 RPM (3.2s)"""
    duration = 3.2
    total_samples = int(duration * SAMPLE_RATE)
    samples = [0.0] * total_samples
    rnd = random.Random(1302)

    phase = 0.0

    for i in range(total_samples):
        t = i / SAMPLE_RATE
        # RPM climbs from 1000 to 8500 at t=2.0s, then cuts off at 8500 with bounce
        if t < 2.0:
            rpm = 1000 + 7500 * (math.sin((t / 2.0) * (math.pi / 2)) ** 1.8)
        else:
            # Cutoff bounce between 8200 and 8600
            bounce_t = (t - 2.0) * 16.0 # 16 Hz bounce
            rpm = 8400 + 200 * math.sin(2 * math.pi * bounce_t)

        f0 = (rpm / 60.0) * 2.0
        phase += 2 * math.pi * f0 / SAMPLE_RATE

        h1 = 0.5 * math.sin(phase)
        h2 = 0.7 * math.sin(2 * phase)
        h3 = 0.55 * math.sin(3 * phase)
        h4 = 0.4 * math.sin(4 * phase)
        h6 = 0.25 * math.sin(6 * phase)

        # Screaming 4-cylinder exhaust roar
        screamer = (h1 + h2 + h3 + h4 + h6) * 0.7
        exhaust_jet = (rnd.random() * 2 - 1) * 0.15 * (rpm / 8500.0)

        # Limiter backfire pops during bounce
        if t > 2.0 and (int((t - 2.0) * 16.0) % 2 == 1) and ((t - 2.0) * 16.0 % 1.0 < 0.25):
            pop = (rnd.random() * 2 - 1) * 0.6
        else:
            pop = 0.0

        samples[i] = screamer + exhaust_jet + pop

    return samples

if __name__ == '__main__':
    write_wav('audio/car_start.wav', make_car_starter())
    write_wav('audio/motor_start.wav', make_motor_starter())
    write_wav('audio/truck_start.wav', make_truck_starter())
    write_wav('audio/motor_idle.wav', make_cb1300_idle())
    write_wav('audio/motor_rev.wav', make_cb1300_rev())
    print("All starter and CB1300 audio files generated successfully!")
